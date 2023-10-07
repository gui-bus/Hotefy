import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
): Promise<void | Response | Promise<void | Response>> {
  const { searchParams } = new URL(request.url);

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId: userId,
    },
    include: {
      trip: true,
    },
  });

  return new NextResponse(JSON.stringify(reservations), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
