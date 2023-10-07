"use client";

import UserReservationItem from "@/components/my-trips/UserReservationItem";
import { Button, Divider, Link } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import { MdTravelExplore } from "react-icons/md";

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);
  const { status, data } = useSession();
  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(
      `/api/user/${(data?.user as any)?.id}/reservations`
    );
    const json = await response.json();

    setReservations(json);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-5 text-2xl font-semibold">Minhas viagens</h1>
      {reservations.length > 0 && (
        <div className="container mx-auto my-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reservations?.map((reservation) => (
            <UserReservationItem
              key={reservation.id}
              reservation={reservation}
              fetchReservations={fetchReservations}
            />
          ))}
        </div>
      )}

      {reservations.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-1 mx-auto max-w-2xl text-center mt-16 px-4">
          <h1 className="font-semibold">
            Oops! Parece que você ainda não possui nenhuma reserva!
          </h1>
          <p>Que tal dar uma olhada nas opçoes?</p>
          <p className="text-tiny">
            Caso possua uma viagem que ainda não está sendo exibida, atualize a
            sua lista!
          </p>

          <Divider className="my-5" />
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              variant="shadow"
              color="secondary"
              className="bg-secondary dark:bg-primaryHotefy-lighter text-white font-medium"
              onClick={() => router.push("/")}
              endContent={<MdTravelExplore size={20} />}
            >
              Ver catálogo de viagens
            </Button>
            <Button
              variant="shadow"
              color="secondary"
              className="bg-secondary dark:bg-primaryHotefy-lighter text-white font-medium"
              onClick={fetchReservations}
              endContent={<RxReload size={20} />}
            >
              Atualizar lista de viagens
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
