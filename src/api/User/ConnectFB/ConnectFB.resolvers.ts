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
      if (!fbId) {
        return {
          ok: false,
          error: "This is not a FB Connect",
          isNew: false,
          token: null
        };
      }
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
            isNew: false
          };
        } else {
          const newUser = await User.create({
            firstName,
            lastName,
            email,
            fbId,
            username: `${firstName.toLowerCase()}.${lastName.toLocaleLowerCase()}`
              .replace(" ", ".")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          }).save();
          const token = await createJWT(newUser.id);
          return {
            ok: true,
            token,
            error: null,
            isNew: true
          };
        }
      } catch (error) {
        return {
          error,
          ok: false,
          token: null,
          isNew: false
        };
      }
    }
  }
};

export default resolvers;
