import { extendType } from 'nexus';
import { pubsub } from '../../../../server.js';
export const UserSubscriptions = extendType({
    type: "Subscription",
    definition(t) {
        t.field("UserSubscriptions", {
            type: "user",
            subscribe: async () => {
                return pubsub.asyncIterator("createUser");
            },
            resolve: async (payload) => {
                return payload;
            }
        });
    },
});
