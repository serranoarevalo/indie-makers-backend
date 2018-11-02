import User from "../../../entities/User";
import { MarkAsReadResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { markAsRead } from "../../../utils/notifications";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    MarkAsRead: privateResolver(
      async (_, __, { req }): Promise<MarkAsReadResponse> => {
        const user: User = req.user;
        await markAsRead(user.username);
        return {
          ok: true
        };
      }
    )
  }
};

export default resolvers;
