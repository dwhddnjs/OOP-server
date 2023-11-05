/*
  Warnings:

  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `Player` table. All the data in the column will be lost.
  - Added the required column `position` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Player` DROP COLUMN `name`,
    DROP COLUMN `team`,
    ADD COLUMN `position` VARCHAR(191) NOT NULL;
