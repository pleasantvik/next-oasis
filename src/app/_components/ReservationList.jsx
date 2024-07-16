"use client";
import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/action";

const ReservationList = ({ bookings }) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentState, bookingIdToDelete) => {
      return currentState?.filter(
        (booking) => booking?.id !== bookingIdToDelete
      );
    }
  );

  const handleDelete = async (bookingId) => {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  };
  return (
    <ul className="space-y-6">
      {optimisticBookings?.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking?.id}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
