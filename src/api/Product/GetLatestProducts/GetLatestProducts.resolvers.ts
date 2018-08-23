import Product from "../../../entities/Product";
import User from "../../../entities/User";
import { GetLatestProductsResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetLatestProducts: privateResolver(
      async (_, __, { req }): Promise<GetLatestProductsResponse> => {
        const user: User = req;
        try {
          const products = await Product.find({
            where: {
              maker: user
            },
            take: 5,
            order: {
              updatedAt: "DESC"
            }
          });
          return {
            error: null,
            ok: true,
            products
          };
        } catch (error) {
          return {
            error,
            ok: false,
            products: null
          };
        }
      }
    )
  }
};

export default resolvers;
