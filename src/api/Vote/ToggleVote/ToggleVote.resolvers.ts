import Product from "../../../entities/Product";
import User from "../../../entities/User";
import Vote from "../../../entities/Vote";
import {
  ToggleVoteMutationArgs,
  ToggleVoteResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { clap } from "../../../utils/notifications";
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
            return {
              ok: true,
              error: null,
              add: false
            };
          } else {
            const product = await Product.findOne(
              { id: args.productId },
              { relations: ["maker"] }
            );
            if (product) {
              await Vote.create({
                maker: user,
                product
              }).save();
              clap(
                product.maker.username,
                user.username,
                product.slug,
                product.name
              );
              return {
                ok: true,
                error: null,
                add: true
              };
            } else {
              return {
                ok: false,
                error: `Product not found`,
                add: false
              };
            }
          }
        } catch (error) {
          return {
            error,
            ok: false,
            add: false
          };
        }
      }
    )
  }
};

export default resolvers;
