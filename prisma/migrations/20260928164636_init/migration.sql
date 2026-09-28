-- CreateTable
CREATE TABLE "Palestrante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "capacidade" INTEGER NOT NULL,
    "palestranteId" INTEGER NOT NULL,
    CONSTRAINT "Evento_palestranteId_fkey" FOREIGN KEY ("palestranteId") REFERENCES "Palestrante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Palestrante_email_key" ON "Palestrante"("email");
