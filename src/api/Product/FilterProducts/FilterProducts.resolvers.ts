import { getConnection, MoreThan } from "typeorm";
import Product from "../../../entities/Product";
import {
  FilterProductsQueryArgs,
  FilterProductsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    FilterProducts: async (
      _,
      args: FilterProductsQueryArgs
    ): Promise<FilterProductsResponse> => {
      const { state } = args;
      try {
        let products;
        switch (state) {
          case "FEATURED":
            products = await Product.find({ isFeatured: true });
          case "HELP":
            products = await Product.find({ needsHelp: true });
            break;
          case "LAUNCHED":
            products = await Product.find({ isLaunched: true });
            break;
          case "NEW":
            products = await getConnection()
              .getRepository(Product)
              .find({
                createdAt: MoreThan(
                  new Date(Date.now() - 24 * 60 * 60 * 1000).toUTCString()
                )
              });
            break;
          case "UPDATED":
            products = await getConnection()
              .getRepository(Product)
              .find({
                updatedAt: MoreThan(
                  new Date(Date.now() - 24 * 60 * 60 * 1000).toUTCString()
                )
              });
            break;
        }
        return {
          products,
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          products: null,
          ok: false,
          error
        };
      }
    }
  }
};

export default resolvers;
