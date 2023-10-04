import ImageSwiper from "@/components/TripDetails/ImageSwiper";
import TripDivider from "@/components/TripDetails/TripDivider";
import TripHeader from "@/components/TripDetails/TripHeader";
import TripReservation from "@/components/TripDetails/TripReservation";
import { prisma } from "@/lib/prisma";
import "swiper/swiper-bundle.css";
import PrismaDisconnect from "@/components/common/PrismaDisconnect";
import TripInfo from "@/components/TripDetails/TripInfo";
import TripLocation from "@/components/TripDetails/TripLocation";

const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  return trip;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  <PrismaDisconnect />;

  return (
    <section className="overflow-x-hidden dark:bg-[#18181b]">
      <div className="w-full h-full">
        <ImageSwiper imagesUrl={trip.imagesUrl} />
      </div>

      <div className="w-full mx-auto p-4 flex flex-col">
        <TripHeader trip={trip} />
        <TripDivider />
        <TripReservation tripEndDate={trip.endDate} tripStartDate={trip.startDate} maxGuests={trip.maxGuests} pricePerDay={trip.pricePerDay as any} tripId={trip.id}/>
        <TripDivider />
        <TripInfo trip={trip} />
        <TripDivider />
        <TripLocation trip={trip}/>
      </div>
    </section>
  );
};

export default TripDetails;
