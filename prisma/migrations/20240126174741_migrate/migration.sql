/*
  Warnings:

  - Made the column `status` on table `alkesproduct` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `alkesproduct` MODIFY `status` BOOLEAN NOT NULL DEFAULT false;
