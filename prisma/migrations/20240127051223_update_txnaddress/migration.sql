/*
  Warnings:

  - You are about to drop the column `txnAddress` on the `alkesproduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `alkesproduct` DROP COLUMN `txnAddress`,
    ADD COLUMN `txnAddressPasien` VARCHAR(191) NULL;
