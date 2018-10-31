import Product from "../../../entities/Product";
import User from "../../../entities/User";
import Vote from "../../../entities/Vote";
import {
  ToggleVoteMutationArgs,
  ToggleVoteResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    ToggleVote: privateResolver(
      async (
        _,
        args: ToggleVoteMutationArgs,
        { req }
      ): Promise<ToggleVoteResponse> => {
        const user: User = req.user;
        try {
          const existingVote = await Vote.findOne({
            productId: args.productId,
            maker: user
          });
          if (existingVote) {
            existingVote.remove();
          } else {
            const product = await Product.findOne({ id: args.productId });
            if (product) {
              await Vote.create({
                maker: user,
                product
              }).save();
            } else {
              return {
                ok: false,
                error: `Product not found`
              };
            }
          }
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
