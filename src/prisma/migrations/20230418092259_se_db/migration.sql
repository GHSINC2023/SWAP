-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_archiveID_fkey";

-- DropForeignKey
ALTER TABLE "Endorse" DROP CONSTRAINT "Endorse_archiveID_fkey";

-- DropForeignKey
ALTER TABLE "JobPost" DROP CONSTRAINT "JobPost_archiveID_fkey";

-- AddForeignKey
ALTER TABLE "Endorse" ADD CONSTRAINT "Endorse_archiveID_fkey" FOREIGN KEY ("archiveID") REFERENCES "Archive"("archiveID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_archiveID_fkey" FOREIGN KEY ("archiveID") REFERENCES "Archive"("archiveID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_archiveID_fkey" FOREIGN KEY ("archiveID") REFERENCES "Archive"("archiveID") ON DELETE CASCADE ON UPDATE CASCADE;
