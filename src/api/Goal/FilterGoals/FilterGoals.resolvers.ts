import { getConnection } from "typeorm";
import User from "../../../entities/User";
import {
  FilterGoalsQueryArgs,
  FilterGoalsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    FilterGoals: async (
      _,
      args: FilterGoalsQueryArgs
    ): Promise<FilterGoalsResponse> => {
      const { status, page } = args;
      const defaultPage = page || 0;
      try {
        const users = await getConnection()
          .getRepository(User)
          .createQueryBuilder("user")
          .innerJoinAndSelect(
            "user.goals",
            "goals",
            "goals.isCompleted = :isCompleted AND goals.completedAt >= NOW() - :time::INTERVAL AND goals.completedAt <= NOW() - :lessDay::INTERVAL",
            {
              isCompleted: status === "COMPLETED",
              time: `${defaultPage + 1} day`,
              lessDay: `${defaultPage} day`
            }
          )
          .orderBy("user.updatedAt", "DESC")
          .getMany();
        return {
          ok: true,
          error: null,
          users
        };
      } catch (error) {
        return {
          ok: false,
          error,
          users: null
        };
      }
    }
  }
};

export default resolvers;
