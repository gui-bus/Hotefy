"use client";
import CurrencyInput from "@/components/common/CurrencyInput";
import DatePicker from "@/components/common/DatePicker";
import Input from "@/components/common/Input";
import { Separator } from "@/components/ui/separator";
import React from "react";

const TripSearch = () => {
  return (
    <section className="container mx-auto p-5 text-center">
      <div className="hero">
        <h2 className="font-semibold text-2xl bg-gradient-to-r from-primaryHotefy-neutral to-primaryHotefy-darker dark:from-primaryHotefy-neutral dark:to-primaryHotefy-lighter text-transparent bg-clip-text">
          Viva a experiência dos seus sonhos!
        </h2>
        <p className="text-gray-600 mt-4 dark:text-white">
          Explore os melhores destinos, reserve os melhores hotéis e crie
          memórias inesquecíveis.
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <Input placeholder="Qual é o seu destino?" />

        <div className="flex gap-4">
          <DatePicker
            placeholderText="Data inicial"
            onChange={() => {}}
            className="w-full"
          />
          <CurrencyInput placeholder="Orçamento" className="w-full"/>
        </div>
      </div>
      <Separator className="mt-5 dark:bg-primaryHotefy-lighter" />
    </section>
  );
};

export default TripSearch;
