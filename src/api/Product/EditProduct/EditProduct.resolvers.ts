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
        const { productId } = args;
        try {
          await Product.update(
            { id: productId, maker: user },
            { ...cleanNullArgs(args) }
          );
          return {
            ok: true,
            error: null
          };
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
