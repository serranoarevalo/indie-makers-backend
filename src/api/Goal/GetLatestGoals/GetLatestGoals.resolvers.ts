import { getConnection } from "typeorm";
import Goal from "../../../entities/Goal";
import User from "../../../entities/User";
import {
  GetLatestGoalsQueryArgs,
  GetLatestGoalsResponse
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";

const resolvers = {
  Query: {
    GetLatestGoals: privateResolver(
      async (
        _,
        args: GetLatestGoalsQueryArgs,
        { req }
      ): Promise<GetLatestGoalsResponse> => {
        const user: User = req.user;
        const { take, page } = args;
        const defaultPage = page || 0;
        try {
          const goals = await getConnection()
            .getRepository(Goal)
            .find({
              take: take || 10,
              skip: 25 * defaultPage,
              where: {
                maker: user
              },
              order: {
                updatedAt: "DESC"
              }
            });
          return {
            error: null,
            ok: true,
            goals
          };
        } catch (error) {
          return {
            error,
            ok: false,
            goals: null
          };
        }
      }
    )
  }
};

export default resolvers;
