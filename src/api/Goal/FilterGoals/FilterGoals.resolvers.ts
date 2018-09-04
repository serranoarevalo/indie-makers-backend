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
      const { status, page, take } = args;
      const defaultPage = page || 0;
      let makers: User[];
      let totalPages = 0;
      try {
        switch (status) {
          case "PENDING":
            [makers, totalPages] = await getConnection()
              .getRepository(User)
              .createQueryBuilder("user")
              .innerJoinAndSelect(
                "user.goals",
                "goals",
                "goals.isCompleted = :isCompleted AND goals.createdAt >= NOW() - :time::INTERVAL AND goals.createdAt <= NOW() - :lessDay::INTERVAL",
                {
                  isCompleted: false,
                  time: `${defaultPage + 1} day`,
                  lessDay: `${defaultPage} day`
                }
              )
              .innerJoinAndSelect("goals.product", "product")
              .take(take || 25)
              .skip(25 * defaultPage)
              .orderBy("user.updatedAt", "DESC")
              .getManyAndCount();
            break;
          case "COMPLETED":
            [makers, totalPages] = await getConnection()
              .getRepository(User)
              .createQueryBuilder("user")
              .innerJoinAndSelect(
                "user.goals",
                "goals",
                "goals.isCompleted = :isCompleted AND goals.completedAt >= NOW() - :time::INTERVAL AND goals.completedAt <= NOW() - :lessDay::INTERVAL",
                {
                  isCompleted: true,
                  time: `${defaultPage + 1} day`,
                  lessDay: `${defaultPage} day`
                }
              )
              .innerJoinAndSelect("goals.product", "product")
              .take(take || 25)
              .skip(25 * defaultPage)
              .orderBy("user.updatedAt", "DESC")
              .getManyAndCount();
            break;
          default:
            [makers, totalPages] = await getConnection()
              .getRepository(User)
              .createQueryBuilder("user")
              .innerJoinAndSelect(
                "user.goals",
                "goals",
                "goals.isCompleted = :isCompleted AND goals.createdAt >= NOW() - :time::INTERVAL AND goals.createdAt <= NOW() - :lessDay::INTERVAL",
                {
                  isCompleted: false,
                  time: `${defaultPage + 1} day`,
                  lessDay: `${defaultPage} day`
                }
              )
              .innerJoinAndSelect("goals.product", "product")
              .take(take || 25)
              .skip(25 * defaultPage)
              .orderBy("user.updatedAt", "DESC")
              .getManyAndCount();
            break;
        }
        return {
          ok: true,
          error: null,
          makers,
          page: page || 0,
          totalPages: Math.floor(totalPages / 25)
        };
      } catch (error) {
        return {
          ok: false,
          error,
          makers: null,
          page: 0,
          totalPages: 0
        };
      }
    }
  }
};

export default resolvers;
