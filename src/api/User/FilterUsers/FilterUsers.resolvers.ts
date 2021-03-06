import { getRepository } from "typeorm";
import User from "../../../entities/User";
import {
  FilterUsersQueryArgs,
  FilterUsersResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    FilterUsers: async (
      _,
      args: FilterUsersQueryArgs
    ): Promise<FilterUsersResponse> => {
      const { status, page = 0, take = 25 } = args;
      const defaultPage = page || 0;
      let makers: User[] | null = null;
      let totalPages = 0;
      try {
        switch (status) {
          case "FIRE":
            [makers, totalPages] = await getRepository(User)
              .createQueryBuilder("user")
              .innerJoinAndSelect(
                "user.goals",
                "goals",
                "goals.isCompleted = :isCompleted",
                {
                  isCompleted: true
                }
              )
              .orderBy("goals", "DESC")
              .getManyAndCount();
            break;
          case "SHIPPED":
            [makers, totalPages] = await getRepository(User)
              .createQueryBuilder("user")
              .innerJoinAndSelect(
                "user.products",
                "products",
                "products.isLaunched = :isLaunched",
                {
                  isLaunched: true
                }
              )
              .orderBy("products", "DESC")
              .getManyAndCount();
            break;
          case "UPDATED":
            [makers, totalPages] = await User.findAndCount({
              order: {
                updatedAt: "DESC"
              },
              skip: 25 * defaultPage,
              take: take || 25
            });
            break;
          default:
            [makers, totalPages] = await User.findAndCount({
              order: {
                updatedAt: "DESC"
              },
              skip: 25 * defaultPage,
              take: take || 25
            });
            break;
        }
        return {
          makers,
          ok: true,
          error: null,
          page: page || 0,
          totalPages: Math.floor(totalPages / 25)
        };
      } catch (error) {
        return {
          error,
          ok: false,
          makers: null,
          page: 0,
          totalPages: 0
        };
      }
    }
  }
};

export default resolvers;
