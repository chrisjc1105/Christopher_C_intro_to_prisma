/*
  Warnings:

  - You are about to drop the column `studentId` on the `Class` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teacherId" INTEGER NOT NULL,
    CONSTRAINT "Class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Class" ("id", "teacherId") SELECT "id", "teacherId" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_teacherId_key" ON "Class"("teacherId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
