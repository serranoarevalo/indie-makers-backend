import Product from "../../../entities/Product";
import User from "../../../entities/User";
import {
  EditProductMutationArgs,
  EditProductResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNull";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    EditProduct: privateResolver(
      async (
        _,
        args: EditProductMutationArgs,
        { req }
      ): Promise<EditProductResponse> => {
        const user: User = req.user;
        const { slug } = args;
        try {
          await Product.update(
            { slug, maker: user },
            { ...cleanNullArgs(args) }
          );
          const product = await Product.findOne({
            slug,
            maker: user
          });
          if (product) {
            return {
              ok: true,
              error: null
            };
          } else {
            return { ok: false, error: "Can't find product" };
          }
        } catch (error) {
          return {
            error,
            ok: false
          };
        }
      }
    )
  }
};
export default resolvers;
