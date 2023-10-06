import { prisma } from "@/lib/prisma";
import React from "react";
import TripItem from "../common/TripItem";
import { Trip } from "@prisma/client";

const fetchTrips = async () => {
  const trips = await prisma.trip.findMany();

  return trips;
};

const AllTrips = async () => {
  const data = await fetchTrips();

  await prisma.$disconnect();

  return (
    <section className="w-full mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-2">
      {data.map((trip: Trip) => (
        <TripItem key={trip.id} trip={trip} />
      ))}
    </section>
  );
};

export default AllTrips;
