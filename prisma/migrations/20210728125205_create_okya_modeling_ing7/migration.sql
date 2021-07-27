/*
  Warnings:

  - You are about to drop the column `category_id` on the `products_group` table. All the data in the column will be lost.
  - Added the required column `product_category_id` to the `products_group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products_group` DROP COLUMN `category_id`,
    ADD COLUMN `product_category_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `products_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products_group` ADD FOREIGN KEY (`product_category_id`) REFERENCES `products_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
