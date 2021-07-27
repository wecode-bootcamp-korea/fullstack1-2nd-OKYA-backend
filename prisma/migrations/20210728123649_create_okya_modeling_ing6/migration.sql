/*
  Warnings:

  - You are about to drop the `_ImageToProductGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImageTypeToProductGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ImageToProductGroup` DROP FOREIGN KEY `_imagetoproductgroup_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ImageToProductGroup` DROP FOREIGN KEY `_imagetoproductgroup_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_ImageTypeToProductGroup` DROP FOREIGN KEY `_imagetypetoproductgroup_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ImageTypeToProductGroup` DROP FOREIGN KEY `_imagetypetoproductgroup_ibfk_2`;

-- DropTable
DROP TABLE `_ImageToProductGroup`;

-- DropTable
DROP TABLE `_ImageTypeToProductGroup`;

-- AddForeignKey
ALTER TABLE `images` ADD FOREIGN KEY (`product_group_id`) REFERENCES `products_group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images_types` ADD FOREIGN KEY (`product_group_id`) REFERENCES `products_group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
