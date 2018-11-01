import Product from "../../../entities/Product";
import User from "../../../entities/User";
import Vote from "../../../entities/Vote";
import { GetProductQueryArgs, GetProductResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetProduct: async (
      _,
      args: GetProductQueryArgs,
      { req }
    ): Promise<GetProductResponse> => {
      const { slug } = args;
      const user: User = req.user;
      try {
        const product = await Product.findOne(
          {
            slug
          },
          {
            relations: ["maker", "goals", "comments", "comments.childComments"]
          }
        );

        if (product) {
          let vote: Vote | undefined;
          if (user) {
            vote = await Vote.findOne({ maker: user, product });
          }
          return {
            product,
            error: null,
            ok: true,
            clapped: vote !== undefined
          };
        } else {
          return {
            product: null,
            error: "Product not found",
            ok: false,
            clapped: false
          };
        }
      } catch (error) {
        return {
          error,
          ok: false,
          product: null,
          clapped: false
        };
      }
    }
  }
};

export default resolvers;
