import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

const Reservation = async ({ cabin }) => {
  const [settings, bookDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin?.id),
  ]);

  const session = await auth();
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector settings={settings} bookedDates={bookDates} cabin={cabin} />
      {session?.user ? (
        <ReservationForm user={session?.user} cabin={cabin} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
