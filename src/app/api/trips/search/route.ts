import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");

  if (!text) {
    return new NextResponse(
      JSON.stringify({
        message: "Missing text parameter",
      }),
      { status: 400 }
    );
  }

  const trips = await prisma.trip.findMany({
    where: {
      OR: [
        {
          name: {
            search: text,
          },
        },
        {
          description: {
            search: text,
          },
        },
        {
          location: {
            search: text,
          },
        },
        {
          locationDescription: {
            search: text,
          },
        },
        {
          type: {
            search: text,
          },
        },
      ],
    },
  });

  return new NextResponse(JSON.stringify(trips), { status: 200 });
}
