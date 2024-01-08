/*
  Warnings:

  - The primary key for the `Booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `UnsignedInt`.
  - The primary key for the `Report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `booking_id` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `follow_up` on the `Report` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `UnsignedInt`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User_blood_glucose` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User_blood_glucose` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `User_blood_glucose` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `UnsignedInt`.
  - The primary key for the `User_blood_pressure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User_blood_pressure` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `User_blood_pressure` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `UnsignedInt`.
  - The primary key for the `User_exercises` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User_exercises` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `UnsignedInt`.
  - The primary key for the `User_weight` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User_weight` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `User_weight` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `UnsignedInt`.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_member_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_member_id` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_number` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `user_member_id` to the `User_blood_glucose` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_member_id` to the `User_blood_pressure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_member_id` to the `User_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_member_id` to the `User_weight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` DROP PRIMARY KEY,
    ADD COLUMN `user_member_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `follow_up` BOOLEAN NOT NULL DEFAULT false,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Report` DROP PRIMARY KEY,
    DROP COLUMN `booking_id`,
    DROP COLUMN `follow_up`,
    ADD COLUMN `user_member_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `member_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `first_name` VARCHAR(255) NOT NULL DEFAULT '',
    MODIFY `last_name` VARCHAR(255) NOT NULL DEFAULT '',
    MODIFY `phone` VARCHAR(8) NOT NULL DEFAULT '',
    MODIFY `id_number` VARCHAR(8) NOT NULL DEFAULT '',
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`member_id`);

-- AlterTable
ALTER TABLE `User_blood_glucose` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `user_member_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User_blood_pressure` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `user_member_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User_exercises` DROP PRIMARY KEY,
    ADD COLUMN `user_member_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User_weight` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `user_member_id` INTEGER UNSIGNED NOT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `User_diets` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_member_id` INTEGER UNSIGNED NOT NULL,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL,
    `type` SMALLINT UNSIGNED NOT NULL,
    `food` VARCHAR(255) NOT NULL DEFAULT '',
    `amount` SMALLINT UNSIGNED NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);
