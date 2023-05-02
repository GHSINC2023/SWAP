import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../server.js";


export const archiveMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createJobPostArchive", {
            type: "archive",
            args: { jobPostID: nonNull(idArg()) },
            resolve: async (_, { jobPostID }): Promise<any> => {
                return await prisma.archive.create({
                    data: {
                        status: "archive",
                        type: "post",
                        createdAt: new Date(Date.now()),
                        JobPost: {
                            connect: {
                                jobPostID
                            }
                        }
                    }
                })
            }
        })
        t.field("createEndorseArchive", {
            type: "archive",
            args: { endorseID: nonNull(idArg()) },
            resolve: async (_, { endorseID }): Promise<any> => {
                return await prisma.archive.create({
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
                })
            }
        })

        t.field("updateArchivedStatus", {
            type: "archive",
            args: { archiveID: nonNull(idArg()), status: nonNull(stringArg()) },
            resolve: async (_, { archiveID, status }): Promise<any> => {
                return await prisma.archive.update({
                    data: { status: status as any },
                    where: {
                        archiveID
                    }
                })
            }
        })
        t.field("deleteArchive", {
            type: "archive",
            args: { archiveID: nonNull(idArg()) },
            resolve: async (_, { archiveID }): Promise<any> => {


                const findArcID = await prisma.archive.findUnique({
                    where: {
                        archiveID
                    },
                    select: {
                        type: true,
                        Applicants: true,
                        Endorse: true
                    }
                })

                if (findArcID.type === "applicant") {
                    await prisma.applicant.delete({
                        where: {
                            applicantID: findArcID.Applicants[ 0 ].applicantID
                        }
                    })
                }

                if (findArcID.type === "endorsed") {

                    const endorse = await prisma.applicant.findMany({
                        where: {
                            Endorsement: {
                                Endorse: {
                                    some: {
                                        endorseID: findArcID.Endorse[ 0 ].endorseID
                                    }
                                }
                            }
                        }
                    })

                    await prisma.applicant.delete({ where: { applicantID: endorse[ 0 ].applicantID } })
                }

                return await prisma.archive.delete({
                    where: {
                        archiveID
                    }
                })
            }
        })
    },
})