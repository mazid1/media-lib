import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MediaType, Favorite } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ErrorBody, SessionUser } from "@/lib/types";

type FavoritesOutput = {
  MOVIE?: Favorite[];
  ANIME?: Favorite[];
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<FavoritesOutput | ErrorBody>> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: true, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user! as SessionUser;
  const userId = +user.id;

  const mediaTypes = req.nextUrl.searchParams.getAll(
    "mediaType"
  ) as MediaType[];

  let favorites = [];
  if (mediaTypes.length > 0) {
    favorites = await prisma.favorite.findMany({
      where: { createdById: userId, mediaType: { in: mediaTypes } },
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

type FavoriteInput = {
  mediaType: MediaType;
  mediaId: string;
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: true, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user! as SessionUser;
  const userId = +user.id;

  const favoriteInput = (await req.json()) as FavoriteInput;

  let newFavorite = null;
  try {
    newFavorite = await prisma.favorite.create({
      data: {
        mediaId: favoriteInput.mediaId,
        mediaType: favoriteInput.mediaType,
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return NextResponse.json(newFavorite, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: true, message: e.message },
      { status: 400 }
    );
  }
}
