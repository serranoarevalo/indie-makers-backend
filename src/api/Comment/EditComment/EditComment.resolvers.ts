import Comment from "../../../entities/Comment";
import User from "../../../entities/User";
import {
  EditCommentMutationArgs,
  EditCommentResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    EditComment: privateResolver(
      async (
        _,
        args: EditCommentMutationArgs,
        { req }
      ): Promise<EditCommentResponse> => {
        const user: User = req.user;
        try {
          await Comment.update(
            {
              maker: user,
              id: args.commentId
            },
            { text: args.text }
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
