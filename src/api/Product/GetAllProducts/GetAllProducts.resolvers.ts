import Product from "../../../entities/Product";
import { GetAllProductsResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetAllProducts: privateResolver(
      async (_, __, { req }): Promise<GetAllProductsResponse> => {
        try {
          const products = await Product.find({ maker: req.user });
          return {
            products,
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error,
            products: null
          };
        }
      }
    )
  }
};

export default resolvers;
