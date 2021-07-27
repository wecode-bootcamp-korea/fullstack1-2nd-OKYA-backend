/*
  Warnings:

  - You are about to drop the column `grid_image_id` on the `products_group` table. All the data in the column will be lost.
  - You are about to drop the column `hover_image_id` on the `products_group` table. All the data in the column will be lost.
  - You are about to drop the `grid_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hover_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `main_image_id` to the `products_group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_image_id` to the `products_group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products_group` DROP FOREIGN KEY `products_group_ibfk_2`;

-- DropForeignKey
ALTER TABLE `products_group` DROP FOREIGN KEY `products_group_ibfk_1`;

-- AlterTable
ALTER TABLE `products_group` DROP COLUMN `grid_image_id`,
    DROP COLUMN `hover_image_id`,
    ADD COLUMN `main_image_id` INTEGER NOT NULL,
    ADD COLUMN `sub_image_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `grid_images`;

-- DropTable
DROP TABLE `hover_images`;

-- CreateTable
CREATE TABLE `sub_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(2000) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `main_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(2000) NOT NULL,
    `category` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products_group` ADD FOREIGN KEY (`sub_image_id`) REFERENCES `sub_images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_group` ADD FOREIGN KEY (`main_image_id`) REFERENCES `main_images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
