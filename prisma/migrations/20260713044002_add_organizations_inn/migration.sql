/*
  Warnings:

  - A unique constraint covering the columns `[inn]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN "inn" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_inn_key" ON "Organization"("inn");
