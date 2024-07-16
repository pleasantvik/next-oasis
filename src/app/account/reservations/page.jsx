import ReservationCard from "../../_components/ReservationCard";
import React from "react";
import { getBookings } from "../../_lib/data-service";
import { auth } from "../../_lib/auth";
import Link from "next/link";
import ReservationList from "../../_components/ReservationList";

const ReservationPage = async () => {
  const session = await auth();
  const bookings = await getBookings(session?.user?.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings?.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
};

export default ReservationPage;
