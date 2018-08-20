import User from "../../../entities/User";
import { ConnectFbMutationArgs, ConnectFBResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    ConnectFB: async (
      _,
      args: ConnectFbMutationArgs
    ): Promise<ConnectFBResponse> => {
      const { firstName, lastName, email, fbId } = args;
      try {
        const user = await User.findOne({
          fbId
        });
        if (user) {
          const token = await createJWT(user.id);
          return {
            ok: true,
            token,
            error: null,
            new: false
          };
        } else {
          const newUser = await User.create({
            firstName,
            lastName,
            email,
            fbId
          }).save();
          const token = await createJWT(newUser.id);
          return {
            ok: true,
            token,
            error: null,
            new: true
          };
        }
      } catch (error) {
        return {
          error,
          ok: false,
          token: null,
          new: false
        };
      }
    }
  }
};

export default resolvers;
