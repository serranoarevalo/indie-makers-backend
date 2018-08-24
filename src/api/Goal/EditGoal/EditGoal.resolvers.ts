import Goal from "../../../entities/Goal";
import User from "../../../entities/User";
import { EditGoalMutationArgs, EditGoalResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNull";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    EditGoal: privateResolver(
      async (
        _,
        args: EditGoalMutationArgs,
        { req }
      ): Promise<EditGoalResponse> => {
        const user: User = req.user;
        try {
          const notNull: any = cleanNullArgs(args);
          if (notNull.isCompleted) {
            notNull.completedAt = Date.now();
          }
          await Goal.update({ id: args.goaldId, maker: user }, { ...notNull });
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
