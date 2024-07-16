"use server";

import { signIn, signOut } from "./auth";
import { auth } from "../_lib/auth";
import {
  createBooking,
  deleteBooking,
  updateBooking,
  updateGuest,
} from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut("google", {
    redirectTo: "/",
  });
}

export async function updateGuestProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  console.log(updateData);

  await updateGuest(session.user?.guestId, updateData);

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");
  const bookingId = Number(formData.get("bookingId"));

  const updatedField = { numGuests, observations };

  // console.log(updatedField);

  await updateBooking(bookingId, updatedField);

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  // const data = Object.fromEntries(formData.entries());
  // console.log(data, "datat");
  const newBooking = {
    ...bookingData,
    guestId: session?.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extrasPrice: 0,
    totalPrice: bookingData?.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
