import { objectType } from 'nexus';
import { prisma } from '../../../../server.js';
export const applicationObject = objectType({
    name: "application",
    definition(t) {
        t.id("applicantID");
        t.string("id");
        t.string("status");
        t.email("email");
        t.datetime("createdAt");
        t.datetime("updatedAt");
        t.list.field("applicantProfile", {
            type: "profile",
            resolve: async (parent) => {
                return await prisma.profile.findMany({
                    where: {
                        Applicant: {
                            applicantID: parent.applicantID
                        }
                    }
                });
            }
        });
        t.list.field("applicantInterviewer", {
            type: "interviewer",
            resolve: async (parent) => {
                return await prisma.interviewer.findMany({
                    where: {
                        Applicant: {
                            applicantID: parent.applicantID
                        }
                    }
                });
            }
        });
        t.list.field("applyJobPost", {
            type: "JobPost",
            resolve: async (parent) => {
                return await prisma.jobPost.findMany({
                    where: {
                        Applicants: {
                            some: {
                                applicantID: parent.applicantID
                            }
                        }
                    }
                });
            }
        });
        t.list.field("applicantUpload", {
            type: "fileUpload",
            resolve: async (parent) => {
                return await prisma.uploadFile.findMany({
                    where: {
                        applicantID: parent.applicantID
                    }
                });
            }
        });
        t.list.field("endorseFeedback", {
            type: "feedback",
            resolve: async (parent) => {
                return await prisma.feedback.findMany({
                    where: {
                        Applicant: {
                            applicantID: parent.applicantID
                        }
                    }
                });
            }
        });
    }
});
export const countApplicatinObject = objectType({
    name: "countByGroup",
    definition(t) {
        t.date("createdAt");
        t.int("_count");
    },
});
