"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import NextImage from "next/image";
import ReactCountryFlag from "react-country-flag";
import { Trip } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { differenceInDays, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { status } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      });

      const res = await response.json();
      if (res?.error) {
        return router.push("/");
      }

      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };

    if (status === "unauthenticated") {
      router.push("/");
    }

    fetchTrip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!trip) return null;

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests");
  const difference = differenceInDays(endDate, startDate);

  return (
    <div className="container mx-auto my-8 flex items-center justify-center w-full">
      <Card className="w-full max-w-3xl z-10">
        <CardHeader className="flex items-center justify-center  font-semibold text-lg bg-secondary dark:bg-primaryHotefy-lighter drop-shadow-xl">
          <h1 className="text-white">Detalhes da viagem</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col md:flex-row gap-2 items-center justify-around px-2 w-full">
            <Image
              as={NextImage}
              width={250}
              height={200}
              src={trip.coverImage}
              alt={trip.name}
              priority
              style={{ objectFit: "cover" }}
              className="aspect-square drop-shadow-lg"
            />
            <div className="flex flex-col items-center justify-center text-center gap-2">
              <h2 className="font-semibold text-xl">{trip.name}</h2>
              <div className="flex gap-1">
                <p className="text-xs">{trip.location}</p>
                <ReactCountryFlag countryCode={trip.countryCode} svg />
              </div>

              <div className="flex flex-col justify-center items-center">
                <Divider className="my-3" />
                <p className="text-sm">Periodo da viagem</p>
                <div className="flex gap-2 items-center">
                  <p className="text-secondary dark:text-primaryHotefy-lighter font-semibold">
                    {format(startDate, "dd 'de' MMMM", { locale: ptBR })}
                  </p>
                  {" - "}
                  <p className="text-secondary dark:text-primaryHotefy-lighter font-semibold">
                    {format(endDate, "dd 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>
                <Divider className="my-3" />
                <div className="flex flex-col gap-2 items-center">
                  <p className="text-sm">Número de hóspedes</p>
                  <p className="text-secondary dark:text-primaryHotefy-lighter font-semibold">
                    {guests} hóspedes
                  </p>
                </div>

                <Divider className="my-3" />
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <p>{`Valor total para ${difference} dias`}</p>
                  <p className="text-secondary dark:text-primaryHotefy-lighter font-semibold">
                    {totalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            variant="shadow"
            color="secondary"
            className="mx-auto my-3 bg-secondary dark:bg-primaryHotefy-lighter"
          >
            Finalizar compra
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TripConfirmation;
