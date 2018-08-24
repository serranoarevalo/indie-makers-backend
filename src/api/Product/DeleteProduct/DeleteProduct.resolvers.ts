import Product from "../../../entities/Product";
import User from "../../../entities/User";
import {
  DeleteProductMutationArgs,
  DeleteProductResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    DeleteProduct: privateResolver(
      async (
        _,
        args: DeleteProductMutationArgs,
        { req }
      ): Promise<DeleteProductResponse> => {
        const user: User = req.user;
        try {
          await Product.delete({ id: args.productId, maker: user });
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
