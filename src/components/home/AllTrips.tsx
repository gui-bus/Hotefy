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
    <section className="w-full mx-auto flex flex-wrap">
      {data.map((trip: Trip) => (
        <div key={trip.id} className="mx-auto">
          <TripItem trip={trip} />
        </div>
      ))}
    </section>
  );
};

export default AllTrips;
