import User from "../../../entities/User";
import {
  FilterUsersQueryArgs,
  FilterUsersResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    FilterUsers: async (
      _,
      args: FilterUsersQueryArgs
    ): Promise<FilterUsersResponse> => {
      const { status, page = 0 } = args;
      try {
        let makers;
        switch (status) {
          case "FIRE":
            makers = await User.find({
              order: {
                streak: "DESC"
              },
              take: 25,
              skip: 0 * page
            });
            break;
          case "SHIPPED":
            makers = await User.find({
              order: {
                launchedProductCount: 1
              },
              relations: ["products"],
              take: 25,
              skip: 0 * page
            });
            break;
          default:
            makers = await User.find({
              order: {
                streak: "DESC"
              },
              take: 25
            });
        }
        return {
          makers,
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          error,
          ok: false,
          makers: null
        };
      }
    }
  }
};

export default resolvers;
