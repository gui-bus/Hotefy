"use client";
import React from "react";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";
import { Button } from "@nextui-org/react";

import { Controller, useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";

interface TripReservationsProps {
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
  } = useForm<TripReservationFormProps>();

  const onSubmit = (data: any) => {
    console.log({ data });
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
                  message: "A data é obrigatória",
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
                  minDate={tripStartDate}
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
                  message: "A data é obrigatória",
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
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          variant="shadow"
          color="secondary"
          className="font-medium"
        >
          Reservar viagem
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
