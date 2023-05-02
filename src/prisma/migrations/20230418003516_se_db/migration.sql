/*
  Warnings:

  - Changed the type of `type` on the `Archive` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "archiveType" AS ENUM ('post', 'endorsed', 'applicant');

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "archiveArchiveID" TEXT;

-- AlterTable
ALTER TABLE "Archive" DROP COLUMN "type",
ADD COLUMN     "type" "archiveType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_archiveArchiveID_fkey" FOREIGN KEY ("archiveArchiveID") REFERENCES "Archive"("archiveID") ON DELETE SET NULL ON UPDATE CASCADE;
