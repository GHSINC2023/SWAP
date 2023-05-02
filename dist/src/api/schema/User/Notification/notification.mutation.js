import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../../../../server.js";
export const notifiacitonMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updateNotificationStatus", {
            type: "notification",
            args: { notificationID: nonNull(idArg()) },
            resolve: async (_, { notificationID }) => {
                return await prisma.notification.update({
                    where: {
                        notificationID
                    },
                    data: {
                        notificationStatus: "read"
                    }
                });
            }
        });
    },
});
