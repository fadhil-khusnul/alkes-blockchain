-- AlterTable
ALTER TABLE `alkesproduct` MODIFY `alkesAddr` VARCHAR(255) NOT NULL,
    MODIFY `generatedId` VARCHAR(255) NOT NULL,
    MODIFY `pasienAddr` VARCHAR(255) NULL,
    MODIFY `txnAddressPasien` VARCHAR(255) NULL;
