/*
  Warnings:

  - The `img` column on the `Add` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Add_img_key";

-- DropIndex
DROP INDEX "Add_name_key";

-- AlterTable
ALTER TABLE "Add" DROP COLUMN "img",
ADD COLUMN     "img" TEXT[];
