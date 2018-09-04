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
      const { status, page } = args;
      const defaultPage = page || 0;
      let products: Product[];
      let totalPages = 0;
      try {
        switch (status) {
          case "FEATURED":
            [products, totalPages] = await getConnection()
              .getRepository(Product)
              .findAndCount({
                take: args.take || 25,
                skip: 25 * defaultPage,
                order: {
                  updatedAt: "DESC"
                },
                where: {
                  isFeatured: true
                },
                relations: ["maker"]
              });
            break;
          case "HELP":
            [products, totalPages] = await getConnection()
              .getRepository(Product)
              .findAndCount({
                take: args.take || 25,
                skip: 25 * defaultPage,
                where: {
                  needsHelp: true
                },
                order: {
                  updatedAt: "DESC"
                },
                relations: ["maker"]
              });
            break;
          case "LAUNCHED":
            [products, totalPages] = await await getConnection()
              .getRepository(Product)
              .findAndCount({
                take: args.take || 25,
                skip: 25 * defaultPage,
                where: {
                  isLaunched: true
                },
                order: {
                  launchedAt: "DESC"
                },
                relations: ["maker"]
              });
            break;
          case "NEW":
            [products, totalPages] = await getConnection()
              .getRepository(Product)
              .findAndCount({
                order: {
                  createdAt: "DESC"
                },
                take: args.take || 25,
                skip: 25 * defaultPage,
                relations: ["maker"]
              });
            break;
          case "UPDATED":
            [products, totalPages] = await getConnection()
              .getRepository(Product)
              .findAndCount({
                order: {
                  updatedAt: "DESC"
                },
                take: args.take || 25,
                relations: ["maker"],
                skip: 25 * defaultPage
                /* where: {
                  updatedAt: MoreThan(
                    new Date(Date.now() - 24 * 60 * 60 * 1000).toUTCString()
                  )
                } */
              });
            break;
          default:
            [products, totalPages] = await getConnection()
              .getRepository(Product)
              .findAndCount({
                take: 25,
                skip: 25 * defaultPage,
                relations: ["maker"],
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
          error: null,
          page: page || 0,
          totalPages: Math.floor(totalPages / 25)
        };
      } catch (error) {
        return {
          products: null,
          ok: false,
          error,
          page: 0,
          totalPages: 0
        };
      }
    }
  }
};

export default resolvers;
