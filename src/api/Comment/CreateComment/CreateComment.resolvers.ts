import Comment from "../../../entities/Comment";
import Product from "../../../entities/Product";
import User from "../../../entities/User";
import {
  CreateCommentMutationArgs,
  CreateCommentResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { comment } from "../../../utils/notifications";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    CreateComment: privateResolver(
      async (
        _,
        args: CreateCommentMutationArgs,
        { req }
      ): Promise<CreateCommentResponse> => {
        const user: User = req.user;
        const { commentId, text, productId } = args;
        try {
          let parentComment: Comment | undefined;
          let product: Product | undefined;
          if (commentId) {
            parentComment = await Comment.findOne(
              { id: commentId },
              { relations: ["product"] }
            );
          }
          if (productId) {
            product = await Product.findOne(
              { id: productId },
              { relations: ["maker"] }
            );
          }
          if (product || parentComment) {
            const newComment = await Comment.create({
              text,
              product,
              maker: user,
              parentComment
            }).save();
            if (product) {
              try {
                if (product.maker.username !== user.username) {
                  comment(
                    product.maker.username,
                    user.username,
                    product.slug,
                    product.name
                  );
                }
              } catch (error) {
                console.log(error);
              }
            }
            if (newComment) {
              return {
                ok: true,
                error: null,
                comment: newComment
              };
            } else {
              return {
                ok: false,
                error: `Can't create comment`,
                comment: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Product not found",
              comment: null
            };
          }
        } catch (error) {
          return {
            error,
            ok: false,
            comment: null
          };
        }
      }
    )
  }
};

export default resolvers;
