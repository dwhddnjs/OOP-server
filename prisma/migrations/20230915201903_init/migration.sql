-- DropForeignKey
ALTER TABLE `Pack` DROP FOREIGN KEY `Pack_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Pack` ADD CONSTRAINT `Pack_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
