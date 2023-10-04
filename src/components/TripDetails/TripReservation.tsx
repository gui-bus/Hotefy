"use client";
import React from "react";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";
import { Trip } from "@prisma/client";
import { Button } from "@nextui-org/react";

interface TripReservationsProps {
  trip: Trip;
}

const TripReservation = ({ trip }: TripReservationsProps) => {
  return (
    <div className="text-primaryHotefy-darker dark:text-white p-2 bg-muted dark:bg-neutral-200/10 rounded-lg">
      <div className="flex flex-col">
        <div className="flex gap-4">
          <DatePicker
            placeholderText="Data inicial"
            onChange={() => {}}
            className="w-full"
          />
          <DatePicker
            placeholderText="Data final"
            onChange={() => {}}
            className="w-full"
          />
        </div>

        <Input
          placeholder={`Número de hóspedes (máximo: ${trip.maxGuests})`}
          className="mt-2"
        />
        <div className="flex justify-between mt-4">
            <p className="font-medium text-sm">Total:</p>
            <p className="font-medium text-sm">R$ 2500</p>
        </div>
        <Button variant="shadow" color="secondary" className="mt-2 font-medium">Reservar viagem</Button>
      </div>
    </div>
  );
};

export default TripReservation;
