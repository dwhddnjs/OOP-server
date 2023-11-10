-- DropForeignKey
ALTER TABLE `Roster` DROP FOREIGN KEY `Roster_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Roster` ADD CONSTRAINT `Roster_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
