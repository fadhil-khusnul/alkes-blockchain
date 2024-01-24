/*
  Warnings:

  - A unique constraint covering the columns `[blockchain_address]` on the table `InformasiAlkes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blockchain_address` to the `GeneratedIds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockchain_address` to the `InformasiAlkes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `generatedids` ADD COLUMN `blockchain_address` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `informasialkes` ADD COLUMN `blockchain_address` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AlkesProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alkesAddr` VARCHAR(191) NOT NULL,
    `generatedId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AlkesProduct_generatedId_key`(`generatedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `InformasiAlkes_blockchain_address_key` ON `InformasiAlkes`(`blockchain_address`);
