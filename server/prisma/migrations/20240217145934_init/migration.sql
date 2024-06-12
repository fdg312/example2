/*
  Warnings:

  - You are about to drop the column `img` on the `Add` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Add` table. All the data in the column will be lost.
  - Added the required column `address` to the `Add` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Add` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Add` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Add` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Add" DROP COLUMN "img",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
