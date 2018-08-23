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
      const { status, page = 0 } = args;
      try {
        let products;
        switch (status) {
          case "FEATURED":
            products = await await getConnection()
              .getRepository(Product)
              .find({
                take: 25,
                skip: 0 * page,
                order: {
                  updatedAt: "DESC"
                },
                where: {
                  isFeatured: true
                }
              });
          case "HELP":
            products = await await getConnection()
              .getRepository(Product)
              .find({
                take: 25,
                skip: 0 * page,
                where: {
                  needsHelp: true
                },
                order: {
                  updatedAt: "DESC"
                }
              });
            break;
          case "LAUNCHED":
            products = await await getConnection()
              .getRepository(Product)
              .find({
                take: 25,
                skip: 0 * page,
                where: {
                  isLaunched: true
                },
                order: {
                  launchedAt: "DESC"
                }
              });
            break;
          case "NEW":
            products = await getConnection()
              .getRepository(Product)
              .find({
                order: {
                  createdAt: "DESC"
                },
                take: 25,
                skip: 0 * page
              });
            break;
          case "UPDATED":
            products = await getConnection()
              .getRepository(Product)
              .find({
                order: {
                  updatedAt: "DESC"
                },
                take: 25,
                skip: 0 * page
                /* where: {
                  updatedAt: MoreThan(
                    new Date(Date.now() - 24 * 60 * 60 * 1000).toUTCString()
                  )
                } */
              });
            break;
          default:
            products = await getConnection()
              .getRepository(Product)
              .find({
                take: 25,
                skip: 0 * page,
                where: {
                  updatedAt: MoreThan(
                    new Date(Date.now() - 24 * 60 * 60 * 1000).toUTCString()
                  )
                }
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
