"use client";
import React from "react";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";
import { Button } from "@nextui-org/react";

import { Controller, useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface TripReservationsProps {
  tripId: string;
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}

interface TripReservationFormProps {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({
  tripId,
  maxGuests,
  tripEndDate,
  tripStartDate,
  pricePerDay,
}: TripReservationsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TripReservationFormProps>();

  const { status } = useSession();

  const router = useRouter();

  const onSubmit = async (data: TripReservationFormProps) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        })
      ),
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Oops! Essa viagem já possui uma reserva nesta data.",
      });

      return setError("endDate", {
        type: "manual",
        message: "Oops! Essa viagem já possui uma reserva nesta data.",
      });
    }

    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", {
        type: "manual",
        message: "Oops! Data inicial inválida.",
      });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", {
        type: "manual",
        message: "Oops! Data final inválida.",
      });
    }

    router.push(
      `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${
        data.guests
      }`
    );
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="text-primaryHotefy-darker dark:text-white p-2 bg-muted dark:bg-neutral-200/10 rounded-lg">
      <div className="flex flex-col">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="startDateLbl" className="text-tiny">
              Data inicial
            </label>
            <Controller
              name="startDate"
              rules={{
                required: {
                  value: true,
                  message: "A data inicial é obrigatória",
                },
              }}
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="startDateLbl"
                  error={!!errors?.startDate}
                  errorMessage={errors?.startDate?.message}
                  onChange={field.onChange}
                  selected={field.value}
                  placeholderText="Insira a data inicial da viagem"
                  className="w-full"
                  minDate={new Date()}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="endDateLbl" className="text-tiny">
              Data final
            </label>
            <Controller
              name="endDate"
              rules={{
                required: {
                  value: true,
                  message: "A data final é obrigatória",
                },
              }}
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="endDateLbl"
                  error={!!errors?.endDate}
                  errorMessage={errors?.endDate?.message}
                  onChange={field.onChange}
                  selected={field.value}
                  placeholderText="Insira a data final da viagem"
                  className="w-full"
                  maxDate={tripEndDate}
                  minDate={startDate ?? tripStartDate}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full mt-2">
          <label htmlFor="guestLbl" className="text-tiny">
            {`Número de hóspedes (máximo: ${maxGuests})`}
          </label>
          <Input
            {...register("guests", {
              required: {
                value: true,
                message: "O número de hóspedes é obrigatório",
              },
              max: {
                value: maxGuests,
                message: `Oops! O número de hóspedes não pode ser maior que ${maxGuests}.`,
              },
              validate: (value) => {
                if (value.toString() === "0") {
                  return "Oops! O número de hóspedes não pode ser 0.";
                }
                return true;
              },
            })}
            id="guestLbl"
            placeholder="Insira o número de hóspedes"
            className="w-full"
            error={!!errors?.guests}
            errorMessage={errors?.guests?.message}
            type="number"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-1 my-3 text-sm">
          <p className="font-medium">
            {startDate && endDate
              ? `Valor total para ${differenceInDays(
                  endDate,
                  startDate
                )} dias de viagem`
              : ""}
          </p>
          <p className="font-medium">
            {startDate && endDate ? (
              <span className="text-primaryHotefy-neutral dark:text-primaryHotefy-lighter font-bold">
                {(
                  differenceInDays(endDate, startDate) * pricePerDay
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
        {status === "authenticated" && (
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            variant="shadow"
            color="secondary"
            className="font-medium"
          >
            Reservar viagem
          </Button>
        )}
        {status === "unauthenticated" && (
          <div className="flex flex-col w-full items-center justify-center">
            <Button
              variant="shadow"
              color="secondary"
              className="font-medium w-full"
              isDisabled
            >
              Reservar viagem
            </Button>
            <p className="mt-2 font-medium text-xs">
              Para reservar uma viagem é necessário fazer login!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripReservation;
