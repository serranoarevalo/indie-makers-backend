import User from "../../../entities/User";
import { EditUserMutationArgs, EditUserResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNull";
import privateResolver from "../../../utils/privateResolver";

const resolvers = {
  Mutation: {
    EditUser: privateResolver(
      async (
        _,
        args: EditUserMutationArgs,
        { req }
      ): Promise<EditUserResponse> => {
        const user: User = req.user;
        try {
          const notNull = cleanNullArgs(args);
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            error,
            ok: false
          };
        }
      }
    )
  }
};
export default resolvers;
