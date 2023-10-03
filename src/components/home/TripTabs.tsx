import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Sidebar } from "./SideBar";
import RecommendedTrips from "./AllTrips";
import NationalTrips from "./NationalTrips";
import InternationalTrips from "./InternationalTrips";

export default function TripTabs() {
  return (
    <>
      <div className="md:block">
        <div className="border-t">
          <div className="bg-background dark:bg-[#18181b]">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="all" className="h-full space-y-6">
                    <div className="space-between flex items-center justify-center md:justify-start">
                      <TabsList className="gap-1 px-1">
                        <TabsTrigger value="all" className="relative">
                          Todas
                        </TabsTrigger>
                        <TabsTrigger value="national" className="relative">
                          Nacionais
                        </TabsTrigger>
                        <TabsTrigger value="international" className="relative">
                          Internacionais
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    {/* Todas */}
                    <TabsContent
                      value="all"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight ">
                            Descubra sua Próxima Aventura
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Aproveite uma ampla gama de opções de hospedagem
                            cuidadosamente selecionadas, perfeitas para todos os
                            tipos de viajantes.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea className="h-full">
                          <RecommendedTrips />
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    {/* Nacionais */}
                    <TabsContent
                      value="national"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Explore as Melhores Hospedagens no Brasil
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Curta uma estadia de primeira classe em destinos
                            exuberantes no Brasil.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea className="h-full">
                          <NationalTrips />
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    {/* Internacional */}
                    <TabsContent
                      value="international"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Viagens de Luxo ao Redor do Mundo
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Desfrute de estadias de luxo no melhor estilo
                            internacional.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea className="h-full">
                          <InternationalTrips />
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
