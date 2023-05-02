import { inputObjectType, objectType } from 'nexus';
import { prisma } from '../../../../../../server.js';
export const commentInput = inputObjectType({
    name: "commentInput",
    definition(t) {
        t.string("message");
        t.string("notes");
    },
});
export const commentObject = objectType({
    name: "comment",
    definition(t) {
        t.id("commentID");
        t.string("message");
        t.string("notes");
        t.datetime("createdAt");
        t.datetime("updatedAt");
        t.list.field("user", {
            type: "user",
            resolve: async (parent) => {
                return await prisma.user.findMany({
                    where: {
                        Comment: {
                            some: {
                                commentID: parent.commentID
                            }
                        }
                    }
                });
            }
        });
    },
});
