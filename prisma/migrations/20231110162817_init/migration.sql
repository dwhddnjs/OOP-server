-- DropForeignKey
ALTER TABLE `Player` DROP FOREIGN KEY `Player_rosterId_fkey`;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_rosterId_fkey` FOREIGN KEY (`rosterId`) REFERENCES `Roster`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
