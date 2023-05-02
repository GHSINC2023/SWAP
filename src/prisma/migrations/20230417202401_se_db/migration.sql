-- CreateEnum
CREATE TYPE "archiveStatus" AS ENUM ('unarchive', 'archive');

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Endorse" ADD COLUMN     "archiveID" TEXT;

-- AlterTable
ALTER TABLE "JobPost" ADD COLUMN     "archiveID" TEXT;

-- CreateTable
CREATE TABLE "Archive" (
    "archiveID" TEXT NOT NULL,
    "status" "archiveStatus" NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Archive_pkey" PRIMARY KEY ("archiveID")
);

-- AddForeignKey
ALTER TABLE "Endorse" ADD CONSTRAINT "Endorse_archiveID_fkey" FOREIGN KEY ("archiveID") REFERENCES "Archive"("archiveID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_archiveID_fkey" FOREIGN KEY ("archiveID") REFERENCES "Archive"("archiveID") ON DELETE SET NULL ON UPDATE CASCADE;
