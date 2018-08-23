import Product from "../../../entities/Product";
import User from "../../../entities/User";
import {
  CreateProductMutationArgs,
  CreateProductResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    CreateProduct: privateResolver(
      async (
        _,
        args: CreateProductMutationArgs,
        { req }
      ): Promise<CreateProductResponse> => {
        const user: User = req;
        try {
          const product = await Product.create({ ...args, maker: user }).save();
          if (product.id) {
            return {
              product,
              error: null,
              ok: true
            };
          } else {
            return {
              product: null,
              error: "Can't create product",
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
    )
  }
};
export default resolvers;
