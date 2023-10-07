import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

type paramsProps = {
  params: { reservationId: string }
}
export async function DELETE(
  _req: NextRequest,
  { params: { reservationId } }: paramsProps,
) {
  console.log(reservationId)
  if (!reservationId) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'MISSING_RESERVATION_ID',
        },
      }),
      {
        status: 400,
      },
    )
  }
  const reservation = await prisma.tripReservation.findUnique({
    where: { id: reservationId },
  })
  if (!reservation) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'RESERVATION_ID_NOT_FOUND',
        },
      }),
      {
        status: 404,
      },
    )
  }
  const reservationDeleted = await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  })
  return new NextResponse(JSON.stringify(reservationDeleted), {
    status: 200,
  })
}