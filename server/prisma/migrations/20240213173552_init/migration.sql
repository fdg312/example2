/*
  Warnings:

  - A unique constraint covering the columns `[img]` on the table `Add` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatarPath]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `img` to the `Add` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Add" ADD COLUMN     "img" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarPath" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Add_img_key" ON "Add"("img");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatarPath_key" ON "User"("avatarPath");
