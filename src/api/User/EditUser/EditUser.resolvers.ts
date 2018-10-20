import { Not } from "typeorm";
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
          const notNull: any = cleanNullArgs(args);
          if (notNull.username) {
            const existing = await User.findOne({
              where: {
                id: Not(user.id),
                username: notNull.username
              }
            });
            if (existing) {
              return {
                ok: false,
                error: "Username taken, try a different one"
              };
            }
          }
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
