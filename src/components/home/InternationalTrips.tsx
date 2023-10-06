import { prisma } from "@/lib/prisma";
import React, { useEffect, useState } from "react";
import TripItem from "../common/TripItem";
import { Trip } from "@prisma/client";

const fetchTrips = async () => {
  const trips = await prisma.trip.findMany();
  return trips;
};

const InternationalTrips = async () => {
  const data = await fetchTrips();

  await prisma.$disconnect();

  const nonBrazilTrips = data.filter((trip: Trip) => trip.countryCode !== "BR");

  return (
    <section className="w-full mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-2">
      {nonBrazilTrips.map((trip: Trip) => (
        <TripItem trip={trip} key={trip.id} />
      ))}
    </section>
  );
};

export default InternationalTrips;
