"use client";
import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import NextImage from "next/image";

import { differenceInDays, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import ReactCountryFlag from "react-country-flag";
import { Prisma } from "@prisma/client";
import toast from "react-hot-toast";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
  // fetchReservations: () => void;
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { trip } = reservation;

  const closePopover = () => {
    setIsOpen(false);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const difference = differenceInDays(
    new Date(reservation.endDate),
    new Date(reservation.startDate)
  );

  const handleDeleteClick = async () => {
    const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return toast.error("Erro ao deletar a sua reserva!");
    }

    toast.success("Reserva cancelada com sucesso!");
    setIsOpen(false);
    reloadPage();
  };

  return (
    <Card className="w-full max-w-3xl z-10">
      <CardHeader className="bg-secondary dark:bg-primaryHotefy-lighter drop-shadow-xl"></CardHeader>
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
                  {format(new Date(reservation.startDate), "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
                {" - "}
                <p className="text-secondary dark:text-primaryHotefy-lighter font-semibold">
                  {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <Divider className="my-3" />
              <div className="flex flex-col gap-2 items-center">
                <p className="text-sm">Número de hóspedes</p>
                <p className="text-secondary dark:text-primaryHotefy-lighter font-semibold">
                  {reservation.guests} hóspedes
                </p>
              </div>

              <Divider className="my-3" />
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <p>{`Valor total pago para ${difference} dias`}</p>
                <p className="text-secondary dark:text-primaryHotefy-lighter font-semibold">
                  {Number(reservation.totalPaid).toLocaleString("pt-BR", {
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
      <CardFooter className="w-full">
        <Popover
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          backdrop="blur"
          classNames={{
            base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50 px-5",
            arrow: "bg-default-200",
          }}
          placement="top"
          showArrow
        >
          <PopoverTrigger className="mx-auto my-3">
            <Button
              variant="shadow"
              color="secondary"
              className=" bg-secondary dark:bg-primaryHotefy-lighter"
            >
              Cancelar
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-xs md:max-w-md">
            <div className="flex flex-col items-center justify-center gap-2 px-5 text-center">
              <div className="flex flex-col items-center justify-center mt-3">
                <p>Tem certeza que deseja cancelar a sua viagem?</p>
                <p className="mt-2 text-tiny text-red-400 dark:text-red-300 font-medium">
                  Essa ação é irreversível!
                </p>
              </div>
              <Divider />
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 my-2">
                <Button
                  variant="shadow"
                  color="secondary"
                  className=" bg-secondary dark:bg-primaryHotefy-lighter w-full md:w-fit"
                  onClick={closePopover}
                >
                  Voltar
                </Button>
                <Button
                  variant="shadow"
                  color="danger"
                  className="mx-auto md:my-3"
                  onClick={handleDeleteClick}
                >
                  Confirmar cancelamento
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};

export default UserReservationItem;
