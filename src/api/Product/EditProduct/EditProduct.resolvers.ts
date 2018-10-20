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
          const product = await Product.findOne({
            slug,
            maker: user
          });
          if (product) {
            if (args.description) {
              product.description = args.description;
              product.description = product.formatDescription(args.description);
            }
            product.save();
            await Product.update(
              { slug, maker: user },
              { ...cleanNullArgs(args) }
            );
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
