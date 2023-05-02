import { objectType } from "nexus";
import { prisma } from "../../../../server.js";
export const archivObject = objectType({
    name: "archive",
    definition(t) {
        t.id("archiveID");
        t.string("status", { description: "archive or unarchive" });
        t.string("type", { description: "what type of archive is this (e.g. job post, endorsement, user, and etc)" });
        t.datetime("createdAt");
        t.list.field("job", {
            type: "JobPost",
            resolve: async (parent) => {
                return await prisma.jobPost.findMany({
                    where: {
                        archiveID: parent.archiveID
                    }
                });
            }
        });
        t.list.field("endorse", {
            type: "endorse",
            resolve: async (parent) => {
                return await prisma.endorse.findMany({
                    where: {
                        archiveID: parent.archiveID
                    }
                });
            }
        });
        t.list.field("applicants", {
            type: "application",
            resolve: async (parent) => {
                return await prisma.applicant.findMany({
                    where: {
                        archiveID: parent.archiveID
                    }
                });
            }
        });
    },
});
