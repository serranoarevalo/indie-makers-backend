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
      try {
        let products;
        switch (status) {
          case "FEATURED":
            products = await getConnection()
              .getRepository(Product)
              .find({
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
          case "HELP":
            products = await getConnection()
              .getRepository(Product)
              .find({
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
            products = await await getConnection()
              .getRepository(Product)
              .find({
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
            products = await getConnection()
              .getRepository(Product)
              .find({
                order: {
                  createdAt: "DESC"
                },
                take: args.take || 25,
                skip: 25 * defaultPage,
                relations: ["maker"]
              });
            break;
          case "UPDATED":
            products = await getConnection()
              .getRepository(Product)
              .find({
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
            products = await getConnection()
              .getRepository(Product)
              .find({
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
