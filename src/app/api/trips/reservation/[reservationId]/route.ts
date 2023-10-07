import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params: { reservationId } }: { params: { reservationId: string } }) {
  if (!reservationId) {
    return new NextResponse(JSON.stringify({ message: "Missing reservationId" }), { status: 400 });
  }

  await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  });

  return new NextResponse(JSON.stringify({ message: "Reservation deleted" }), { status: 200 });
}
