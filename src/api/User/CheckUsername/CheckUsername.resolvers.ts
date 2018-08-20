import User from "../../../entities/User";
import {
  CheckUsernameQueryArgs,
  CheckUsernameResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    CheckUsername: async (
      _,
      args: CheckUsernameQueryArgs
    ): Promise<CheckUsernameResponse> => {
      const { username } = args;
      try {
        const user = await User.findOne({
          username
        });
        if (user) {
          return {
            ok: true,
            error: null,
            available: false
          };
        } else {
          return {
            ok: true,
            error: null,
            available: true
          };
        }
      } catch (error) {
        return {
          error,
          ok: false,
          available: null
        };
      }
    }
  }
};

export default resolvers;
