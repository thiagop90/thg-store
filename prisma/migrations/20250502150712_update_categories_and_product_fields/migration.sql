/*
  Warnings:

  - You are about to drop the column `descriptionEn` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionPt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `nameEn` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `namePt` on the `products` table. All the data in the column will be lost.
  - Added the required column `description` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "descriptionEn",
DROP COLUMN "descriptionPt",
DROP COLUMN "nameEn",
DROP COLUMN "namePt",
ADD COLUMN     "description" TEXT NOT NULL;
