/*
  Warnings:

  - You are about to drop the column `product_group_id` on the `images_types` table. All the data in the column will be lost.
  - Added the required column `image_id` to the `images_types` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `images_types` DROP FOREIGN KEY `images_types_ibfk_1`;

-- AlterTable
ALTER TABLE `images_types` DROP COLUMN `product_group_id`,
    ADD COLUMN `image_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `images_types` ADD FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
