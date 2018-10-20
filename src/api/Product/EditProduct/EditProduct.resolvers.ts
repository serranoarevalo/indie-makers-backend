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
            if (args.name) {
              product.name = product.formatName(args.name);
              product.slug = product.formatSlug(args.name);
            }
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
              product,
              error: null
            };
          } else {
            return { ok: false, product: null, error: "Can't find product" };
          }
        } catch (error) {
          return {
            product: null,
            error,
            ok: false
          };
        }
      }
    )
  }
};
export default resolvers;
