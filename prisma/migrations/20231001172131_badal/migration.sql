/*
  Warnings:

  - Added the required column `blogid` to the `Comente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Comente` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "comante" TEXT NOT NULL,
    CONSTRAINT "Comente_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comente" ("comante", "id") SELECT "comante", "id" FROM "Comente";
DROP TABLE "Comente";
ALTER TABLE "new_Comente" RENAME TO "Comente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
