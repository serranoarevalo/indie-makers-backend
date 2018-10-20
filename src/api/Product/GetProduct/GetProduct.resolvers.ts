import Product from "../../../entities/Product";
import { GetProductQueryArgs, GetProductResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetProduct: async (
      _,
      args: GetProductQueryArgs
    ): Promise<GetProductResponse> => {
      const { slug } = args;
      try {
        const product = await Product.findOne(
          {
            slug
          },
          { relations: ["maker", "goals"] }
        );
        if (product) {
          return {
            product,
            error: null,
            ok: true
          };
        } else {
          return {
            product: null,
            error: "Product not found",
            ok: false
          };
        }
      } catch (error) {
        return {
          error,
          ok: false,
          product: null
        };
      }
    }
  }
};

export default resolvers;
