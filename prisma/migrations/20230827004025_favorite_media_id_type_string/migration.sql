/*
  Warnings:

  - A unique constraint covering the columns `[createdById,mediaId,mediaType]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Favorite_createdById_key";

-- AlterTable
ALTER TABLE "Favorite" ALTER COLUMN "mediaId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_createdById_mediaId_mediaType_key" ON "Favorite"("createdById", "mediaId", "mediaType");
