/*
  Warnings:

  - You are about to drop the column `movies` on the `Favorite` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'ANIME');

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_createdById_fkey";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "movies",
ADD COLUMN     "mediaId" INTEGER NOT NULL,
ADD COLUMN     "mediaType" "MediaType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
