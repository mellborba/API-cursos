/*
  Warnings:

  - You are about to drop the column `instrutorId` on the `Curso` table. All the data in the column will be lost.
  - Added the required column `instrutor_id` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "instrutor_id" INTEGER NOT NULL,
    CONSTRAINT "Curso_instrutor_id_fkey" FOREIGN KEY ("instrutor_id") REFERENCES "Instrutor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Curso" ("descricao", "id", "titulo") SELECT "descricao", "id", "titulo" FROM "Curso";
DROP TABLE "Curso";
ALTER TABLE "new_Curso" RENAME TO "Curso";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
