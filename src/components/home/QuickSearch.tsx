import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/react";

const buttonData = [
  { href: "/hoteis", src: "/hotel.png", alt: "Hotel", text: "Hoteis" },
  { href: "/fazendas", src: "/farm.png", alt: "Fazenda", text: "Fazendas" },
  { href: "/chales", src: "/cottage.png", alt: "Chalé", text: "Chalés" },
  { href: "/pousadas", src: "/inn.png", alt: "Pousada", text: "Pousadas" },
  {
    href: "/especiais",
    src: "/special.png",
    alt: "Especial",
    text: "Especiais",
  },
];

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-2">
      <div className="flex items-center">
        <div className="w-full h-px bg-primaryHotefy-darker"></div>
        <h2 className="font-medium whitespace-nowrap px-4 text-primaryHotefy-darker">
          Atalhos
        </h2>
        <div className="w-full h-px bg-primaryHotefy-darker"></div>
      </div>

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-4 w-full">
          {buttonData.map((item, index) => (
            <Link href={item.href} key={index}>
              <Button
                variant="light"
                startContent={
                  <Image src={item.src} alt={item.alt} width={25} height={25} />
                }
                className="w-full justify-start dark:filter dark:invert dark:grayscale flex flex-col"
              ></Button>
              <span className="dark:filter dark:invert dark:grayscale">
                {item.text}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
