import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../../../server.js";
import { GESend } from "../../../../helpers/email.js";
export const endorseMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createEndorse", {
            type: "endorse",
            args: { endorsementID: nonNull(idArg()), companyID: nonNull(idArg()), userID: nonNull(idArg()) },
            resolve: async (_, { companyID, endorsementID, userID }) => {
                return await prisma.$transaction(async () => {
                    const user = await prisma.user.findUnique({
                        where: { userID },
                        include: {
                            Profile: true
                        }
                    });
                    const endorsement = await prisma.endorsement.findUnique({
                        where: {
                            endorsementID
                        },
                        include: {
                            Applicant: true
                        }
                    });
                    const applicant = await prisma.applicant.findUnique({
                        where: {
                            applicantID: endorsement.Applicant[0].applicantID
                        },
                        include: {
                            JobPost: true,
                            Profile: true
                        }
                    });
                    const company = await prisma.company.findUnique({
                        where: {
                            companyID
                        }
                    });
                    const endorse = await prisma.endorse.create({
                        data: {
                            endorseStatus: "waiting",
                            Company: {
                                connect: {
                                    companyID
                                }
                            },
                            Endorsement: {
                                connect: {
                                    endorsementID
                                }
                            },
                            createdAt: new Date(Date.now()),
                            User: {
                                connect: {
                                    userID
                                }
                            }
                        },
                        include: {
                            Endorsement: {
                                include: {
                                    Applicant: {
                                        include: {
                                            Profile: true
                                        }
                                    },
                                    Company: true
                                }
                            }
                        }
                    });
                    await prisma.logs.create({
                        data: {
                            title: "Endorsed an Applicant",
                            modifiedBy: `${user.Profile.firstname} ${user.Profile.lastname}`,
                            createdAt: new Date(Date.now()),
                            User: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    });
                    GESend(applicant.email, `Dear Mr./Ms.Mrs. <b>${applicant.Profile.lastname}</b><br><br>Good Day!<br><br>We are pleased to inform you that your application's endorsement to <b>${company.companyName}</b> has been approved. Your application will now proceed to the <b>third phase</b> of the application process. Please check the progress of your application on your account.<br><br>Kindly anticipate hearing from us soon regarding the status of your application and further instructions.<br><br><br>Regards, <br><br><b>Global Headstart Specialist Inc.</b>
                    `, `Application for ${applicant.JobPost.title} is endorsed to ${company.companyName}`);
                    return endorse;
                });
            }
        });
        t.field("updateEndorse", {
            type: "endorse",
            args: { endorseStatus: nonNull(stringArg()), endorseID: nonNull(idArg()), userID: nonNull(idArg()), feedback: nonNull(stringArg()) },
            resolve: async (_, { endorseStatus, endorseID, userID, feedback }, { req }) => {
                return await prisma.$transaction(async () => {
                    const applicant = await prisma.endorsement.findMany({
                        where: {
                            Endorse: {
                                some: {
                                    endorseID
                                }
                            },
                        },
                        include: {
                            Applicant: {
                                include: {
                                    Profile: true,
                                    JobPost: true,
                                }
                            }
                        }
                    });
                    const user = await prisma.user.findUnique({
                        where: { userID },
                        include: {
                            Profile: true
                        }
                    });
                    const endorse = await prisma.endorse.update({
                        data: {
                            endorseStatus: endorseStatus,
                            feedback: {
                                create: {
                                    feedback,
                                    createdAt: new Date(Date.now()),
                                    Applicant: {
                                        connect: {
                                            applicantID: applicant[0].Applicant[0].applicantID
                                        }
                                    }
                                },
                            }
                        },
                        where: {
                            endorseID
                        },
                        include: {
                            Endorsement: true,
                            Company: {
                                include: {
                                    User: {
                                        include: {
                                            Profile: true
                                        }
                                    }
                                }
                            },
                            User: {
                                include: {
                                    Profile: true
                                }
                            }
                        }
                    });
                    await prisma.logs.create({
                        data: {
                            title: "Update Endorse",
                            modifiedBy: `${user.Profile.firstname} ${user.Profile.lastname}`,
                            createdAt: new Date(Date.now()),
                            User: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    });
                    if (endorse.endorseStatus === "approved") {
                        GESend(applicant[0].Applicant[0].email, `Dear Mr./Ms.Mrs. <b>${applicant[0].Applicant[0].Profile.lastname}</b><br><br> We are delighted to inform you that <b>${endorse.Company[0].companyName}</b> has approved the endorsement of your <b> ${applicant[0].Applicant[0].JobPost.title}</b> application to their company. <br><br>Kindly check your application status in your account and please wait for further instructions.<br><br><br>If you have any further questions or if there is anything else we can help you with, please let us know by reaching out to us via (02) 8-298-4313.<br><br><br>Regards, <br><br><b>Global Headstart Specialist Inc.</b>  `, `Endorsed Status`);
                        await prisma.archive.create({
                            data: {
                                status: "archive",
                                type: "endorsed",
                                createdAt: new Date(Date.now()),
                                Endorse: {
                                    connect: {
                                        endorseID
                                    }
                                }
                            }
                        });
                    }
                    if (endorse.endorseStatus === "declined") {
                        GESend(applicant[0].Applicant[0].email, `Dear Mr./Ms.Mrs. <b>${applicant[0].Applicant[0].Profile.lastname}</b><br><br>Thank you for applying for the position of <b>${applicant[0].Applicant[0].JobPost.title}</b>, and we appreciate your interest with <b>${endorse.Company[0].companyName}</b>. The following is their feedback towards your application:<br><br> <i>"${feedback}"</i><br><br>Although your qualifications and skills are impressive, we have to inform you that <b>${endorse.Company[0].User[0].Profile.firstname} ${endorse.Company[0].User[0].Profile.lastname}</b>, the employer from ${endorse.Company[0].companyName}, has decided to move forward with another applicant at this time.<br><br> Now that we have had the chance to learn more about you, we will keep your application on record and <b>reach out to you as soon as there is another job opening that better suits your skills and experience</b>.<br><br>In the meantime, we encourage you to keep polishing the skills required for this role or browse the other job openings on our site.<br><br><br>If you have any further questions or if there is anything else we can help you with, please let us know by reaching out to us via (02) 8-298-4313.<br><br><br>Regards, <br><br><b>Global Headstart Specialist Inc.</b> 
                        `, `Endorsed Status`);
                    }
                    return endorse;
                });
            }
        });
        t.list.field("getEndorseByCSV", {
            type: "endorse",
            args: { userID: idArg(), status: nonNull(stringArg()), orders: nonNull("orderedBy"), end: nonNull(stringArg()), start: nonNull(stringArg()) },
            resolve: async (_, { userID, status, orders, end, start }) => {
                const user = await prisma.user.findUnique({
                    where: {
                        userID
                    }
                });
                return await prisma.endorse.findMany({
                    where: {
                        endorseStatus: status,
                        createdAt: {
                            lte: new Date(end),
                            gte: new Date(start)
                        },
                        Company: {
                            some: {
                                companyID: user.companyID
                            }
                        }
                    },
                    orderBy: {
                        createdAt: orders
                    }
                });
            }
        });
    },
});
