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

  const nonBrazilTrips = data.filter((trip: Trip) => trip.countryCode !== 'BR');

  return (
    <section className="w-full mx-auto flex flex-wrap">
      {nonBrazilTrips.map((trip: Trip) => (
        <div key={trip.id} className="mx-auto">
          <TripItem trip={trip} />
        </div>
      ))}
    </section>
  );
};

export default InternationalTrips;
