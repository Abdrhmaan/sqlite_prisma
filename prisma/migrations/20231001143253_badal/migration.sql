-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "comante" TEXT NOT NULL,
    CONSTRAINT "Comente_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comente" ("blogid", "comante", "id", "userid") SELECT "blogid", "comante", "id", "userid" FROM "Comente";
DROP TABLE "Comente";
ALTER TABLE "new_Comente" RENAME TO "Comente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
