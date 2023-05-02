import { subscriptionField } from 'nexus';
import { pubsub } from '../../../../../server.js';
export const endorsementMutation = subscriptionField("createEndorsementSub", {
    type: "endorsement",
    subscribe: async () => {
        return await pubsub.asyncIterator("createEndrosementSub");
    },
    resolve: async (payload) => {
        return payload;
    }
});
