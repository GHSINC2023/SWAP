import { subscriptionField } from "nexus";
import { pubsub } from "../../../../../server.js";
export const notificationSubs = subscriptionField("NotificationSubscriptions", {
    type: "notification",
    subscribe: async () => {
        return pubsub.asyncIterator("createNotificationSub");
    },
    resolve: async (payload) => {
        return payload;
    }
});
