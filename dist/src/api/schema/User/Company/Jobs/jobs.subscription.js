import { subscriptionField } from 'nexus';
import { pubsub } from '../../../../../../server.js';
export const jobSubscription = subscriptionField("createAJobPostSubscriptions", {
    type: "JobPost",
    subscribe: async () => {
        return await pubsub.asyncIterator("createJobPostSub");
    },
    resolve: async (payload) => {
        return await payload;
    }
});
