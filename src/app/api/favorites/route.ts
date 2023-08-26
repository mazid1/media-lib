import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MediaType } from "@prisma/client";

export async function GET(req: NextRequest) {
  const mediaTypes = req.nextUrl.searchParams.getAll(
    "mediaType"
  ) as MediaType[];

  // todo: add filter based on createdBy
  let favorites = [];
  if (mediaTypes.length > 0) {
    favorites = await prisma.favorite.findMany({
      where: { mediaType: { in: mediaTypes } },
    });
  } else {
    favorites = await prisma.favorite.findMany();
  }

  return NextResponse.json(favorites);
}
