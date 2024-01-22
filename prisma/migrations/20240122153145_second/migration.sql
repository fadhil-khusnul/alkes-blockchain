/*
  Warnings:

  - You are about to drop the column `kuantitas` on the `informasialkes` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `InformasiAlkes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `informasialkes` DROP COLUMN `kuantitas`,
    ADD COLUMN `quantity` INTEGER NOT NULL;
