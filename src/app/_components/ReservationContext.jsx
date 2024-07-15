"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext({
  range: {},
  setRange: () => {},
  resetRange: () => {},
});

const initialState = {
  from: undefined,
  to: undefined,
};
const ReservationProvider = ({ children }) => {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);

  if (context === undefined) {
    throw new Error("Context was used outside the provider");
  }

  return context;
};

export default ReservationProvider;
