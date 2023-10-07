import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_request: Request, { params: { reservationId } }: { params: { reservationId: string } }) {
  if (!reservationId) {
    const errorResponse = {
      status: 400,
      body: {
        message: "Missing reservationId",
      },
    };

    return new Response(JSON.stringify(errorResponse), {
      status: errorResponse.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const reservation = await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  });

  return new Response(null, { status: 204 }); // Retorna uma resposta vazia com status 204 (No Content)
}
