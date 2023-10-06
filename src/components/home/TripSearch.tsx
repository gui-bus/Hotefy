"use client";
import Input from "@/components/common/Input";
import { Button } from "@nextui-org/react";
import React from "react";
import worldMap from "@/../public/world-map.png";

import { ImSearch } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface TripSearchForm {
  text: string;
}

const TripSearch = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TripSearchForm>();

  const onSubmit = (data: TripSearchForm) => {
    router.push(`/trips/search?text=${data.text}`);
  };

  return (
    <section
      className="container mx-auto p-5 text-center bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${worldMap.src})` }}
    >
      <div className="hero">
        <h2 className="font-bold text-xl md:text-2xl ">
          Encontre o refúgio perfeito e{" "}
          <span className="bg-gradient-to-r from-primaryHotefy-neutral to-primaryHotefy-lighter dark:from-primaryHotefy-neutral dark:to-primaryHotefy-lighter text-transparent bg-clip-text">
            realize os seus sonhos!
          </span>
        </h2>
        <p className="text-gray-600 mt-4 dark:text-white text-sm md:text-base max-w-2xl mx-auto">
          Seja qual for o seu estilo de viagem, nós temos a acomodação ideal
          para tranformar sua estadia em uma experiência única e memorável
        </p>
      </div>

      <div className="flex flex-col items-center justify-center my-4 w-full max-w-5xl mx-auto rounded-xl">
        {errors.text && (
          <span className="mb-2 font-medium text-xs text-red-400 dark:text-red-300 mx-auto md:mr-auto md:ml-0">
            {errors.text.message}
          </span>
        )}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full">
          <Input
            placeholder="Buscar destinos..."
            autoComplete="off"
            error={!!errors.text}
            {...register("text", {
              required: {
                value: true,
                message: "Digite o destino no campo de pesquisa!",
              },
            })}
          />

          <Button
            color="secondary"
            variant="shadow"
            endContent={<ImSearch size={16} />}
            className="w-full md:max-w-[10rem]"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Pesquisar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripSearch;
