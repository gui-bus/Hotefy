import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_request: Request, { params: { reservationId } }: { params: { reservationId: string } }) {
  if (!reservationId) {
    return {
      status: 400,
      body: {
        message: "Missing reservationId",
      },
    } as unknown as NextResponse<unknown>; // Conversão explícita para NextResponse<unknown>
  }

  try {
    const reservation = await prisma.tripReservation.delete({
      where: {
        id: reservationId,
      },
    });

    return new NextResponse(JSON.stringify(reservation), { status: 200 });
  } catch (error) {
    // Lide com erros de forma apropriada
    console.error("Error deleting reservation:", error);

    return {
      status: 500,
      body: {
        message: "Internal Server Error",
      },
    } as unknown as NextResponse<unknown>; // Conversão explícita para NextResponse<unknown>
  }
}
