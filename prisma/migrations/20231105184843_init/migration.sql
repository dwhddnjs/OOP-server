-- RenameIndex
ALTER TABLE `Player` RENAME INDEX `Player_rosterId_fkey` TO `Player_rosterId_idx`;

-- RenameIndex
ALTER TABLE `Roster` RENAME INDEX `Roster_userId_fkey` TO `Roster_userId_idx`;
