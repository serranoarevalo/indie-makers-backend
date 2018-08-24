import Goal from "../../../entities/Goal";
import Product from "../../../entities/Product";
import User from "../../../entities/User";
import {
  CreateGoalMutationArgs,
  CreateGoalResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    CreateGoal: privateResolver(
      async (
        _,
        args: CreateGoalMutationArgs,
        { req }
      ): Promise<CreateGoalResponse> => {
        const user: User = req.user;
        try {
          const product = await Product.findOne({
            id: args.productId,
            maker: user
          });
          if (product) {
            const goal = await Goal.create({
              text: args.text,
              product,
              maker: user
            }).save();
            return {
              ok: true,
              error: null,
              goal
            };
          } else {
            return {
              ok: false,
              error: "Product not found",
              goal: null
            };
          }
        } catch (error) {
          return {
            error,
            ok: false,
            goal: null
          };
        }
      }
    )
  }
};

export default resolvers;
