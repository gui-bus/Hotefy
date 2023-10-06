import { prisma } from "@/lib/prisma";
import React, { useEffect, useState } from "react";
import TripItem from "../common/TripItem";
import { Trip } from "@prisma/client";

const fetchTrips = async () => {
  const trips = await prisma.trip.findMany();
  return trips;
};

const NationalTrips = async () => {
  const data = await fetchTrips();

  await prisma.$disconnect();

  // Filtrar as trips com countryCode igual a 'BR'
  const brazilTrips = data.filter((trip: Trip) => trip.countryCode === "BR");

  return (
    <section className="w-full mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-2">
      {brazilTrips.map((trip: Trip) => (
        <TripItem trip={trip} key={trip.id} />
      ))}
    </section>
  );
};

export default NationalTrips;
