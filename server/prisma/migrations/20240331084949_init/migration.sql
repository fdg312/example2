/*
  Warnings:

  - You are about to drop the `_AddToFavourite` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `addId` to the `Favourite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AddToFavourite" DROP CONSTRAINT "_AddToFavourite_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddToFavourite" DROP CONSTRAINT "_AddToFavourite_B_fkey";

-- AlterTable
ALTER TABLE "Favourite" ADD COLUMN     "addId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AddToFavourite";

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_addId_fkey" FOREIGN KEY ("addId") REFERENCES "Add"("id") ON DELETE CASCADE ON UPDATE CASCADE;
