'use client'
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link"; // Importar o Link do Next.js
import Image from "next/image";
import { Separator } from "../ui/separator";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

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

const recommendedData = [
  { href: "/trips/8f6a1f51-1f8e-4a8c-8f03-37489f633f2b", text: "Alianz Loft" },
  { href: "/trips/9b0f2817-ae92-4ff2-8d22-8478f0854bfc", text: "Casa Proa" },
  { href: "/trips/b7219d9c-1988-4657-9e17-16a0fd58787a", text: "Dragon Temple" },
  { href: "/trips/f11e9920-e78a-43d6-904b-3dc3b69e1f2b", text: "Gladden Island" },
  { href: "/trips/6b67eaf7-f5a8-4415-85b1-a7b841b49cbb", text: "Mirror House North" },
  { href: "/trips/aee3e85e-9480-4802-89ce-6178cc8fd01a", text: "Modern Oceanfront" },
  { href: "/trips/990a0f8b-81d9-416b-aef4-ee8de36d9ffe", text: "Ocaso Luxury Villa" },
  { href: "/trips/6b46d67c-a4de-4b79-9945-205cd293a866", text: "Ocean's Edge" },
  { href: "/trips/93ea17ee-30ab-477c-a7c8-f4fa7da21c7d", text: "Paradise" },
  { href: "/trips/8c04c98a-2eb9-4ac5-8731-594e0ebf5b20", text: "Whispering Pines" },
  { href: "/trips/eef4f101-3977-48d7-b1c6-e0d2ef388f54", text: "Yui Valley" },
  { href: "/trips/1ca333f1-0c57-43b7-adf6-65a0fbae4fc7", text: "Zion EcoCabin" },
];

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Pesquisa rápida
          </h2>
          <div className="space-y-1">
            {buttonData.map((item, index) => (
              <Link href={item.href} key={index}>
                <Button
                  variant="light"
                  startContent={
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={25}
                      height={25}
                    />
                  }
                  className="w-full justify-start dark:filter dark:invert dark:grayscale"
                >
                  <span className="dark:filter dark:invert dark:grayscale">
                    {item.text}
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <Separator />
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Recomendados
          </h2>
          <ScrollArea className="h-56 px-3 py-2">
            <div className="space-y-1">
              {recommendedData.map((item, index) => (
                <Link href={item.href} key={index}>
                  <Button variant="light" className="w-full justify-start">
                    {item.text}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
