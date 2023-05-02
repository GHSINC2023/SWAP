/*
  Warnings:

  - You are about to drop the column `archiveArchiveID` on the `Applicant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_archiveArchiveID_fkey";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "archiveArchiveID",
ADD COLUMN     "archiveID" TEXT;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_archiveID_fkey" FOREIGN KEY ("archiveID") REFERENCES "Archive"("archiveID") ON DELETE SET NULL ON UPDATE CASCADE;
