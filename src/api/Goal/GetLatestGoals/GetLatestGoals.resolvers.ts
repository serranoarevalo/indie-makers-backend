import { getConnection } from "typeorm";
import Goal from "../../../entities/Goal";
import User from "../../../entities/User";
import { GetLatestGoalsResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";

const resolvers = {
  Query: {
    GetLatestGoals: privateResolver(
      async (_, __, { req }): Promise<GetLatestGoalsResponse> => {
        const user: User = req.user;
        try {
          const goals = await getConnection()
            .getRepository(Goal)
            .find({
              take: 10,
              where: {
                isCompleted: false,
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
