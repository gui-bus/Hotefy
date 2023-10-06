"use client";
import TripItem from "@/components/common/TripItem";
import { Button } from "@nextui-org/react";
import { Trip } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import { MdTravelExplore } from "react-icons/md";

const SearchResult = () => {
  const [trips, setTrips] = React.useState<Trip[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const homePage = () => {
    router.push("/");
  };

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.get("text") ?? ""}`
      );

      const data = await response.json();
      setTrips(data);
    };

    fetchTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center my-5 text-center px-4">
        <h1 className="text-2xl font-semibold">Hospedagens encontradas</h1>
        <p className="text-sm mt-2">
          {trips.length > 0
            ? `${trips.length === 1 ? "Foi encontrada" : "Foram encontradas"} ${
                trips.length === 1 ? "uma" : trips.length
              } ${trips.length === 1 ? "hospedagem" : "hospedagens"} que ${
                trips.length === 1 ? "possui" : "possuem"
              } o termo ${'"'}${searchParams.get("text")}${'"'} em seu anúncio.`
            : `Infelizmente não foi possível encontrar nenhuma hospedagem com o termo ${'"'}${searchParams.get(
                "text"
              )}${'"'} :(`}
        </p>
        {trips.length === 0 && (
          <Button
            variant="shadow"
            color="secondary"
            className="mx-auto bg-secondary dark:bg-primaryHotefy-lighter my-5"
            endContent={<MdTravelExplore />}
            onClick={homePage}
          >
            Voltar para o catálogo
          </Button>
        )}
      </div>


      <div className="container mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-4">
        {trips?.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
