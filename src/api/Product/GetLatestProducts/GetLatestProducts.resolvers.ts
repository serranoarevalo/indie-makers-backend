import Product from "../../../entities/Product";
import User from "../../../entities/User";
import {
  GetLatestProductsQueryArgs,
  GetLatestProductsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetLatestProducts: privateResolver(
      async (
        _,
        args: GetLatestProductsQueryArgs,
        { req }
      ): Promise<GetLatestProductsResponse> => {
        const user: User = req.user;
        const { take, page } = args;
        const defaultPage = page || 0;
        try {
          const products = await Product.find({
            where: {
              maker: user
            },
            take: take || 10,
            skip: 25 * defaultPage,
            order: {
              updatedAt: "ASC"
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
