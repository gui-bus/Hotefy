"use client";
import { Trip } from "@prisma/client";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import TripMap from "./TripMap";
import ReactCountryFlag from "react-country-flag";

interface TripLocationProps {
  trip: Trip;
}

const TripLocation = ({ trip }: TripLocationProps) => {
  return (
    <div className="px-3">
      <h1 className="font-semibold flex items-center gap-1 text-lg">
        Localização <MdLocationOn size={20} />
      </h1>
      <p className="font-medium text-tiny mb-2">
        Descubra o que você precisa saber sobre o local que ficará hospedado
      </p>

      
      <div className="my-2">
        <TripMap location={trip.location} />
      </div>
      <div className="flex items-center gap-1 font-medium">
        <ReactCountryFlag svg countryCode={trip.countryCode} />
        <h3>{trip.location}</h3>
      </div>
      <p className="text-sm leading-5">{trip.locationDescription}</p>
    </div>
  );
};

export default TripLocation;
