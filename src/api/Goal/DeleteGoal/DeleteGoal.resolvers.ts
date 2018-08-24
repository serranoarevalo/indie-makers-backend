import Goal from "../../../entities/Goal";
import User from "../../../entities/User";
import {
  DeleteGoalMutationArgs,
  DeleteGoalResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    DeleteGoal: privateResolver(
      async (
        _,
        args: DeleteGoalMutationArgs,
        { req }
      ): Promise<DeleteGoalResponse> => {
        const user: User = req.user;
        try {
          await Goal.delete({ id: args.goalId, maker: user });
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
