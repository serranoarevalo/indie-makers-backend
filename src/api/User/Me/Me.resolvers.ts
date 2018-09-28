import User from "../../../entities/User";
import { MeResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    Me: privateResolver(
      async (_, __, { req }): Promise<MeResponse> => {
        const user: User = req.user;
        return {
          ok: true,
          error: null,
          user
        };
      }
    )
  }
};

export default resolvers;
