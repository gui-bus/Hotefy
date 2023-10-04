"use client";
import { Trip } from "@prisma/client";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import NextImage from "next/image";

import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

interface TripItemProps {
  trip: Trip;
}

const TripItem = ({ trip }: TripItemProps) => {
  const price = trip.pricePerDay.toString();
  return (
    <Link href={`/trips/${trip.id}`}>
      <Card
        isPressable
        radius="md"
        className="border-none w-[18.5rem] mb-3 lg:mb-5 shadow-none select-none"
      >
        <Image
          className="object-cover h-full w-full aspect-square"
          as={NextImage}
          src={trip.coverImage}
          alt={trip.name}
          width={320}
          height={320}
        />
        <CardFooter className="justify-between bg-[#18181b] border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 py-2">
          <div className="flex flex-col gap-1 items-center">
            <p className="text-xs text-white font-semibold z-50">{trip.name}</p>

            <div className="flex gap-1">
              <p className="text-xs text-white font-semibold">
                {trip.location}
              </p>
              <ReactCountryFlag countryCode={trip.countryCode} svg />
            </div>
          </div>
          <div className="text-tiny text-white bg-secondary px-4 py-2 rounded-full font-medium">
            {parseFloat(price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TripItem;
