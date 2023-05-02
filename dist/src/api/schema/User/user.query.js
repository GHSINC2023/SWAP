import { GraphQLError } from "graphql/index.mjs";
import authorization from "jsonwebtoken";
import { extendType, idArg, intArg, nonNull, stringArg } from "nexus";
import { prisma } from '../../../../server.js';
const { verify } = authorization;
export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllUser", {
            type: "user",
            resolve: async (_, __, { req }) => {
                const token = req.cookies["ghs_access_token"];
                const { userID, role } = verify(token, "HeadStart");
                if (userID && role === "administrator" || "moderator") {
                    return await prisma.user.findMany();
                }
                else {
                    throw new GraphQLError("UnAuthorized");
                }
            }
        });
        t.list.field("getUserByID", {
            type: "user",
            args: { userID: nonNull(idArg()) },
            resolve: async (_, { userID }) => {
                return await prisma.user.findMany({
                    where: {
                        userID
                    }
                });
            }
        });
        t.list.field("getUserByRoles", {
            type: "user",
            args: { limit: nonNull(intArg()), offset: nonNull(intArg()), role: stringArg(), order: "orderedBy" },
            resolve: async (_, { limit, offset, role, order }, { req }) => {
                const token = req.cookies["ghs_access_token"];
                const { userID, role: roles } = verify(token, "HeadStart");
                if (userID && role === "administrator" || "moderator") {
                    return await prisma.user.findMany({
                        where: {
                            role: role
                        },
                        take: limit,
                        skip: offset,
                        orderBy: {
                            createdAt: order
                        }
                    });
                }
                else {
                    throw new GraphQLError("UnAuthorized");
                }
            }
        });
    },
});
