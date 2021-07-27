/*
  Warnings:

  - You are about to drop the column `image_id` on the `images_types` table. All the data in the column will be lost.
  - Added the required column `image_type_id` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `images_types` DROP FOREIGN KEY `images_types_ibfk_1`;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `image_type_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `images_types` DROP COLUMN `image_id`;

-- AddForeignKey
ALTER TABLE `images` ADD FOREIGN KEY (`image_type_id`) REFERENCES `images_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
