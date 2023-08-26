import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MediaType, Favorite } from "@prisma/client";

type FavoritesOutput = {
  MOVIE?: Favorite[];
  ANIME?: Favorite[];
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<FavoritesOutput>> {
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

  const output: FavoritesOutput = {};
  for (const mType of mediaTypes) {
    output[mType] = favorites.filter((f) => f.mediaType === mType);
  }

  return NextResponse.json(output);
}
