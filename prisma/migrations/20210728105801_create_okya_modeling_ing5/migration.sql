/*
  Warnings:

  - You are about to drop the column `order_product_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `main_image_id` on the `products_group` table. All the data in the column will be lost.
  - You are about to drop the column `sub_image_id` on the `products_group` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `products_group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Decimal(8,2)`.
  - You are about to drop the column `social_login` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `main_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order_status_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `additional_price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `products_group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `carts_ibfk_2`;

-- DropForeignKey
ALTER TABLE `order_products` DROP FOREIGN KEY `order_products_ibfk_1`;

-- DropForeignKey
ALTER TABLE `products_group` DROP FOREIGN KEY `products_group_ibfk_2`;

-- DropForeignKey
ALTER TABLE `products_group` DROP FOREIGN KEY `products_group_ibfk_1`;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `order_product_id`;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `order_status_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `price`,
    ADD COLUMN `additional_price` DECIMAL(8, 2) NOT NULL,
    ADD COLUMN `image_url` VARCHAR(2000) NOT NULL;

-- AlterTable
ALTER TABLE `products_group` DROP COLUMN `main_image_id`,
    DROP COLUMN `sub_image_id`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    MODIFY `price` DECIMAL(8, 2) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `social_login`,
    ADD COLUMN `social_platform` VARCHAR(45);

-- DropTable
DROP TABLE `main_images`;

-- DropTable
DROP TABLE `order_products`;

-- DropTable
DROP TABLE `sub_images`;

-- CreateTable
CREATE TABLE `ordered_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(2000) NOT NULL,
    `product_group_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `product_group_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_furnishing_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masonries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(2000) NOT NULL,
    `home_furnishing_category_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImageToProductGroup` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ImageToProductGroup_AB_unique`(`A`, `B`),
    INDEX `_ImageToProductGroup_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImageTypeToProductGroup` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ImageTypeToProductGroup_AB_unique`(`A`, `B`),
    INDEX `_ImageTypeToProductGroup_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ordered_products` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordered_products` ADD FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD FOREIGN KEY (`order_status_id`) REFERENCES `order_status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masonries` ADD FOREIGN KEY (`home_furnishing_category_id`) REFERENCES `home_furnishing_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToProductGroup` ADD FOREIGN KEY (`A`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToProductGroup` ADD FOREIGN KEY (`B`) REFERENCES `products_group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageTypeToProductGroup` ADD FOREIGN KEY (`A`) REFERENCES `images_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageTypeToProductGroup` ADD FOREIGN KEY (`B`) REFERENCES `products_group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
