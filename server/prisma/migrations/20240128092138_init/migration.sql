/*
  Warnings:

  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Subcategory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Category_slug_key";

-- DropIndex
DROP INDEX "Subcategory_slug_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "slug";
