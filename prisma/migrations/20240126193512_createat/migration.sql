/*
  Warnings:

  - You are about to drop the column `timestamp` on the `alkesproduct` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `AlkesProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alkesproduct` DROP COLUMN `timestamp`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL;
