/*
  Warnings:

  - You are about to drop the column `blogid` on the `Comente` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Comente` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comante" TEXT NOT NULL
);
INSERT INTO "new_Comente" ("comante", "id") SELECT "comante", "id" FROM "Comente";
DROP TABLE "Comente";
ALTER TABLE "new_Comente" RENAME TO "Comente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
