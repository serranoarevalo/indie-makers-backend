import { getConnection } from "typeorm";
import Goal from "../../../entities/Goal";
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
      let goals: Goal[];
      let totalPages = 0;
      try {
        switch (status) {
          case "PENDING":
            // Group the goals by day
            [goals, totalPages] = await getConnection()
              .getRepository(Goal)
              .findAndCount({
                order: { createdAt: "DESC" },
                skip: 25 * defaultPage,
                take: take || 25,
                where: {
                  isCompleted: false
                },
                relations: ["maker"]
              });
            break;
          case "COMPLETED":
            [goals, totalPages] = await getConnection()
              .getRepository(Goal)
              .findAndCount({
                order: { completedAt: "DESC" },
                skip: 25 * defaultPage,
                take: take || 25,
                where: {
                  isCompleted: true
                },
                relations: ["maker"]
              });
            break;
          default:
            [goals, totalPages] = await getConnection()
              .getRepository(Goal)
              .findAndCount({
                order: { createdAt: "DESC" },
                skip: 25 * defaultPage,
                take: take || 25,
                where: {
                  isCompleted: false
                },
                relations: ["maker"]
              });
            break;
        }
        return {
          ok: true,
          error: null,
          goals,
          page: page || 0,
          totalPages: Math.floor(totalPages / 25)
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          error,
          goals: null,
          page: 0,
          totalPages: 0
        };
      }
    }
  }
};

export default resolvers;
