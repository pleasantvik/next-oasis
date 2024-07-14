import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";

const Reservation = async ({ cabin }) => {
  const [settings, bookDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin?.id),
  ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector settings={settings} bookedDates={bookDates} cabin={cabin} />
      <ReservationForm cabin={cabin} />
    </div>
  );
};

export default Reservation;
