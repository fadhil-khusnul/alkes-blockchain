-- AlterTable
ALTER TABLE `alkesproduct` ADD COLUMN `pasienAddr` VARCHAR(191) NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;
