/*
  Warnings:

  - You are about to drop the column `description` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Student` table. All the data in the column will be lost.
  - Added the required column `certificate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regNo` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "logo" DROP NOT NULL,
ALTER COLUMN "logo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "description",
DROP COLUMN "image",
ADD COLUMN     "certificate" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "regNo" TEXT NOT NULL;
