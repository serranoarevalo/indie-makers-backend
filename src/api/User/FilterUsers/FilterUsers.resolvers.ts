import { getRepository, MoreThan } from "typeorm";
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
      const { status, page = 0, take } = args;
      const defaultPage = page || 0;
      try {
        let makers;
        switch (status) {
          case "FIRE":
            makers = await User.find({
              order: {
                streak: "DESC"
              },
              where: { streak: MoreThan(0) },
              skip: 25 * defaultPage,
              take: take || 25
            });
            break;
          case "SHIPPED":
            makers = await getRepository(User)
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
              .getMany();
            break;
          case "UPDATED":
            makers = await User.find({
              order: {
                updatedAt: "DESC"
              },
              skip: 25 * defaultPage,
              take: take || 25
            });
        }
        return {
          makers,
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          error,
          ok: false,
          makers: null
        };
      }
    }
  }
};

export default resolvers;
