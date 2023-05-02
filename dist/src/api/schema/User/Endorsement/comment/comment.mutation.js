import { extendType, idArg, nonNull } from 'nexus';
import { prisma } from '../../../../../../server.js';
export const commentMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createComment", {
            type: "comment",
            args: { endorsementID: nonNull(idArg()), userID: nonNull(idArg()), comments: "commentInput", },
            resolve: async (_, { endorsementID, userID, comments: { message, notes } }) => {
                return await prisma.comment.create({
                    data: {
                        message, notes,
                        createdAt: new Date(Date.now()),
                        updatedAt: new Date(Date.now()),
                        User: {
                            connect: {
                                userID
                            }
                        },
                        Endorsement: {
                            connect: {
                                endorsementID
                            }
                        }
                    }
                });
            }
        });
        t.field("deleteComment", {
            type: "comment",
            args: { commentID: nonNull(idArg()) },
            resolve: async (_, { commentID }) => {
                return await prisma.comment.delete({
                    where: {
                        commentID
                    }
                });
            }
        });
    },
});
