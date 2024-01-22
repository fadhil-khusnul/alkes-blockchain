-- CreateTable
CREATE TABLE `InformasiAlkes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_alkes` VARCHAR(191) NOT NULL,
    `deskripsi_alkes` VARCHAR(191) NOT NULL,
    `kategori_alkes` VARCHAR(191) NOT NULL,
    `subkategori_alkes` VARCHAR(191) NOT NULL,
    `klasifikasi` VARCHAR(191) NOT NULL,
    `tipe_alkes` VARCHAR(191) NOT NULL,
    `kelas_resiko` VARCHAR(191) NOT NULL,
    `kuantitas` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GeneratedIds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `informasiAlkesId` INTEGER NOT NULL,
    `generatedId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GeneratedIds_generatedId_key`(`generatedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GeneratedIds` ADD CONSTRAINT `GeneratedIds_informasiAlkesId_fkey` FOREIGN KEY (`informasiAlkesId`) REFERENCES `InformasiAlkes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
