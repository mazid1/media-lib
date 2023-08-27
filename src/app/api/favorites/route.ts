import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MediaType, Favorite } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  DeleteFavoriteInput,
  ErrorBody,
  CreateFavoriteInput,
  GetFavoritesOutput,
  SessionUser,
} from "@/lib/types";

export async function GET(
  req: NextRequest
): Promise<NextResponse<GetFavoritesOutput | ErrorBody>> {
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

  const output: GetFavoritesOutput = {};
  for (const mType of mediaTypes) {
    output[mType] = favorites.filter((f) => f.mediaType === mType);
  }

  return NextResponse.json(output);
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<Favorite | ErrorBody>> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: true, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user! as SessionUser;
  const userId = +user.id;

  const favoriteInput = (await req.json()) as CreateFavoriteInput;

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

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<Favorite | ErrorBody>> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: true, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = session.user! as SessionUser;
  const userId = +user.id;

  const { id } = (await req.json()) as DeleteFavoriteInput;

  const favorite = await prisma.favorite.findUnique({
    where: { id },
    select: { id: true, createdById: true },
  });

  if (!favorite) {
    return NextResponse.json(
      { error: true, message: "Not found" },
      { status: 404 }
    );
  }

  if (favorite.createdById !== userId) {
    // Instead of sending Unauthorized error sending Not found error, so that hacker do not get any useful info.
    return NextResponse.json(
      { error: true, message: "Not found" },
      { status: 404 }
    );
  }

  try {
    const deletedItem = await prisma.favorite.delete({ where: { id } });
    return NextResponse.json(deletedItem, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: true, message: e.message },
      { status: 400 }
    );
  }
}
