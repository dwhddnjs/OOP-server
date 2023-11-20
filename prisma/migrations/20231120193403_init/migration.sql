/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Card` DROP FOREIGN KEY `Card_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Pack` DROP FOREIGN KEY `Pack_userId_fkey`;

-- DropTable
DROP TABLE `Card`;

-- DropTable
DROP TABLE `Pack`;
