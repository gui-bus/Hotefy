"use client";

import UserReservationItem from "@/components/my-trips/UserReservationItem";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);
  const { status, data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`
      );
      const json = await response.json();

      setReservations(json);
    };

    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  console.log({ reservations });
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-5">Minhas viagens</h1>
      <div className="container mx-auto my-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {reservations?.map((reservation) => (
          <UserReservationItem key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
