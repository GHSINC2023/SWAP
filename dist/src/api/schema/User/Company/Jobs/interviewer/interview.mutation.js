import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../../../../../../server.js";
import { GESend } from "../../../../../helpers/email.js";
export const interviewMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createInterviewer", {
            type: "interviewer",
            args: { userID: nonNull(idArg()), applicantID: nonNull(idArg()) },
            resolve: async (_, { userID, applicantID }) => {
                return await prisma.$transaction(async () => {
                    const app = await prisma.applicant.findUnique({
                        where: {
                            applicantID
                        },
                        include: {
                            Profile: true,
                            JobPost: true
                        }
                    });
                    const user = await prisma.user.findUnique({
                        where: { userID },
                        include: {
                            Profile: true
                        }
                    });
                    const interview = await prisma.interviewer.create({
                        data: {
                            User: {
                                connect: {
                                    userID
                                }
                            },
                            Applicant: {
                                connect: {
                                    applicantID
                                }
                            },
                            createdAt: new Date(Date.now())
                        },
                        include: {
                            User: {
                                include: {
                                    Profile: true
                                }
                            }
                        }
                    });
                    await prisma.logs.create({
                        data: {
                            title: "Interviewed Applicant",
                            modifiedBy: `${user.Profile.firstname} ${user.Profile.lastname}`,
                            createdAt: new Date(Date.now()),
                            User: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    });
                    GESend(app.email, `Dear Mr./Ms./Mrs. <b>${app.Profile.lastname}</b>,<br><br>Your application for the position of <b>${app.JobPost.title}</b> is currently being reviewed by our recruiters. You are now pending for an interview with Mr./Ms./Mrs. <b>${interview.User.Profile.firstname} ${interview.User.Profile.lastname}</b>, the interviewer who has been assigned to you.<br><br> Kindly wait for more instrunctions and updates on the interview schedule.<br><br><br>If you have any further questions or if there is anything else we can help you with, please let us know by reaching out to us via (02) 8-298-4313.<br><br><br>Regards,<br><br><b>Global Headstart Specialist Inc.</b>
                    `, `Your Application is being Reviewed`);
                    return interview;
                });
            }
        });
    },
});
