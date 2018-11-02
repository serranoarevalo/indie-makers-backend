import User from "../../../entities/User";
import { GetNotificationsResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { getFeed } from "../../../utils/notifications";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetNotifications: privateResolver(
      async (_, __, { req }): Promise<GetNotificationsResponse> => {
        const user: User = req.user;
        const { results, unread }: any = await getFeed(user.username);
        const notifications: any[] = [];
        for await (const result of results) {
          result.activities.forEach(activity =>
            notifications.push({ ...activity, isSeen: result.is_seen })
          );
        }
        return {
          ok: true,
          error: null,
          unseen: unread as any,
          notifications
        };
      }
    )
  }
};

export default resolvers;
