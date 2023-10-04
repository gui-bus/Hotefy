"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Trip } from "@prisma/client";

import {
  MdOutlineDescription,
  MdStar,
  MdInfoOutline,
  MdPeopleAlt,
} from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineClockCircle } from "react-icons/ai";

interface TripReservationsProps {
  trip: Trip;
}

const TripInfo = ({ trip }: TripReservationsProps) => {
  return (
    <div className="text-primaryHotefy-darker dark:text-white">
      <Accordion defaultExpandedKeys={[]}>
        <AccordionItem
          key="1"
          aria-label="Descrição"
          subtitle={
            <span className="font-medium text-tiny">
              Confira as principais características e o que torna este local
              único
            </span>
          }
          title={
            <span className="font-semibold  flex items-center gap-1">
              Sobre a viagem <MdOutlineDescription size={20} />
            </span>
          }
          className="text-sm leading-5"
        >
          {trip.description}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Destaques"
          subtitle={
            <span className="font-medium text-tiny">
              Veja a lista de alguns dos itens oferecidos pela hospedagem
            </span>
          }
          title={
            <span className="font-semibold  flex items-center gap-1">
              Destaques <MdStar size={20} />
            </span>
          }
          className="text-sm leading-5"
        >
          <div className="flex flex-wrap gap-y-3">
            {trip.highlights.map((highlight, index) => (
              <div
                className="flex items-center gap-2 w-full md:w-1/2"
                key={index}
              >
                <div className="text-primaryHotefy-neutral dark:text-primaryHotefy-lighter">
                  <IoMdCheckmarkCircleOutline size={20} />
                </div>
                <p>{highlight}</p>
              </div>
            ))}
          </div>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Extra"
          subtitle={
            <span className="font-medium text-tiny">
              Fique por dentro de algumas informaçoes cruciais para a sua viagem
            </span>
          }
          title={
            <span className="font-semibold  flex items-center gap-1">
              Informações extras <MdInfoOutline size={20} />
            </span>
          }
          className="text-sm leading-5"
        >
          <div className="flex flex-wrap gap-y-3">
            <p className="flex items-center gap-1 md:w-1/3">
              <span className="text-primaryHotefy-neutral dark:text-primaryHotefy-lighter">
                <AiOutlineClockCircle size={20} />
              </span>
              Check-in: {trip.checkIn}
            </p>
            <p className="flex items-center gap-1 md:w-1/3">
              <span className="text-primaryHotefy-neutral dark:text-primaryHotefy-lighter">
                <AiOutlineClockCircle size={20} />
              </span>
              Checkout: {trip.checkOut}
            </p>
            <p className="flex items-center gap-1 md:w-1/3">
              <span className="text-primaryHotefy-neutral dark:text-primaryHotefy-lighter">
                <MdPeopleAlt size={20} />
              </span>
              Máximo de {trip.maxGuests} hóspedes
            </p>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TripInfo;
