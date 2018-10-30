import Comment from "../../../entities/Comment";
import User from "../../../entities/User";
import {
  DeleteCommentMutationArgs,
  DeleteCommentResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    DeleteComment: privateResolver(
      async (
        _,
        args: DeleteCommentMutationArgs,
        { req }
      ): Promise<DeleteCommentResponse> => {
        const user: User = req.user;
        try {
          const comment = await Comment.findOne(
            {
              id: args.commentId
            },
            { relations: ["product"] }
          );
          if (comment) {
            if (
              comment.product.makerId === user.id ||
              comment.makerId === user.id
            ) {
              comment.remove();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Cant delete"
              };
            }
          } else {
            return {
              ok: false,
              error: "Comment not found"
            };
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
