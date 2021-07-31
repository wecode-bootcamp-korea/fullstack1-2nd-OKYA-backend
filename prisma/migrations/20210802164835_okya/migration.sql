-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(200),
    MODIFY `name` VARCHAR(45),
    MODIFY `phone_number` VARCHAR(45),
    MODIFY `road_address` VARCHAR(100),
    MODIFY `detail_address` VARCHAR(200),
    MODIFY `zip_code` VARCHAR(45);
