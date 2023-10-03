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
  { href: "/alianz", text: "Alianz Loft" },
  { href: "/casa-proa", text: "Casa Proa" },
  { href: "/dragon-temple", text: "Dragon Temple" },
  { href: "/gladden-island", text: "Gladden Island" },
  { href: "/mirror-house-north", text: "Mirror House North" },
  { href: "/modern-oceanfront", text: "Modern Oceanfront" },
  { href: "/ocaso-luxury-villa", text: "Ocaso Luxury Villa" },
  { href: "/oceans-edge", text: "Ocean's Edge" },
  { href: "/paradise", text: "Paradise" },
  { href: "/whispering-pines", text: "Whispering Pines" },
  { href: "/yui-valley", text: "Yui Valley" },
  { href: "/zion-ecocabin", text: "Zion EcoCabin" },
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
