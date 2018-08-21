import User from "../../../entities/User";
import { GetMakerQueryArgs, GetMakerResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolver: Resolvers = {
  Query: {
    GetMaker: async (_, args: GetMakerQueryArgs): Promise<GetMakerResponse> => {
      const { username } = args;
      try {
        const user = await User.findOne(
          {
            username
          },
          { relations: ["goals"] }
        );
        if (user) {
          return {
            ok: true,
            error: null,
            maker: user
          };
        } else {
          return {
            ok: false,
            error: "Maker not found",
            maker: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error,
          maker: null
        };
      }
    }
  }
};

export default resolver;
