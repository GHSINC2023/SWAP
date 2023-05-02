import { extendType, idArg, intArg, nonNull, stringArg } from 'nexus';
import { prisma } from '../../../../../server.js';
export const endorsementQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getEndorsementAll", {
            type: "endorsement",
            resolve: async () => {
                return await prisma.endorsement.findMany();
            }
        });
        t.list.field("getEndorsementById", {
            type: "endorsement",
            args: { endorsementID: nonNull(idArg()) },
            resolve: async (_, { endorsementID }) => {
                return await prisma.endorsement.findMany({
                    where: {
                        endorsementID
                    }
                });
            }
        });
        t.list.field("getAllEndorsementByGroup", {
            type: "countByGroup",
            resolve: async () => {
                const endorsement = await prisma.endorsement.groupBy({
                    by: ["createdAt"],
                    _count: {
                        endorsementID: true
                    },
                    orderBy: {
                        createdAt: "asc"
                    }
                });
                return endorsement.map(({ _count, createdAt }) => {
                    return { _count: _count.endorsementID, createdAt: createdAt };
                });
            }
        });
        t.list.field("getEndorsementSpecificStatus", {
            type: "endorsement",
            args: {
                status: nonNull(stringArg()), limit: nonNull(intArg()), order: "orderedBy", offset: nonNull(intArg())
            },
            resolve: async (_, { status, limit, order, offset }) => {
                return await prisma.endorsement.findMany({
                    where: {
                        Status: status,
                    },
                    take: limit,
                    skip: offset,
                    orderBy: {
                        createdAt: order
                    }
                });
            }
        });
        t.list.field("getEndorsementByDWMY", {
            type: "countByGroup",
            args: { start: nonNull(stringArg()), end: nonNull(stringArg()) },
            resolve: async (_, { start, end }) => {
                const endorse = await prisma.endorsement.groupBy({
                    by: ["createdAt"],
                    where: {
                        createdAt: {
                            lte: new Date(end),
                            gte: new Date(start)
                        }
                    },
                    _count: {
                        createdAt: true
                    }
                });
                return endorse.map(({ _count, createdAt }) => {
                    return { _count: _count.createdAt, createdAt: createdAt };
                });
            }
        });
    }
});
