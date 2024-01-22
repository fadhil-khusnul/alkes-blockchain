/*
  Warnings:

  - You are about to drop the column `quantity` on the `informasialkes` table. All the data in the column will be lost.
  - Added the required column `kuantitas` to the `InformasiAlkes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `informasialkes` DROP COLUMN `quantity`,
    ADD COLUMN `kuantitas` INTEGER NOT NULL;
