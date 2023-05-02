import { extendType, nonNull, stringArg, idArg } from "nexus";
import { prisma } from "../../../../server.js";


export const archiveQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getArchiveID", {
            type: "archive",
            args: { archiveID: nonNull(idArg()) },
            resolve: async (_, { archiveID }): Promise<any> => {
                return await prisma.archive.findMany({
                    where: {
                        archiveID
                    }
                })
            }
        })
        t.list.field("getArchiveByDate", {
            type: "archive",
            args: { start: nonNull(stringArg()), end: nonNull(stringArg()), type: nonNull(stringArg()) },
            resolve: async (_, { type, start, end }): Promise<any> => {
                return await prisma.archive.findMany({
                    where: {
                        type: type as any,
                        createdAt: {
                            lte: new Date(end),
                            gte: new Date(start)
                        }
                    }
                })
            }
        })
    },
})