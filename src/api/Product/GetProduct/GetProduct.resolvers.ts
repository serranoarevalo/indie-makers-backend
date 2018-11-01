import { getTreeRepository } from "typeorm";
import Comment from "../../../entities/Comment";
import Product from "../../../entities/Product";
import User from "../../../entities/User";
import Vote from "../../../entities/Vote";
import { GetProductQueryArgs, GetProductResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetProduct: async (
      _,
      args: GetProductQueryArgs,
      { req }
    ): Promise<GetProductResponse> => {
      const { slug } = args;
      const user: User = req.user;
      try {
        const product = await Product.findOne(
          {
            slug
          },
          {
            relations: ["maker", "goals", "comments"]
          }
        );

        if (product) {
          let vote: Vote | undefined;
          if (user) {
            vote = await Vote.findOne({ maker: user, product });
          }
          const comments: Comment[] = [];
          const commentRepository = await getTreeRepository(Comment);
          for await (const comment of product.comments) {
            const commentTree = await commentRepository.findDescendantsTree(
              comment
            );
            comments.push(commentTree);
          }
          return {
            product,
            error: null,
            ok: true,
            clapped: vote !== undefined,
            comments
          };
        } else {
          return {
            product: null,
            error: "Product not found",
            ok: false,
            clapped: false,
            comments: null
          };
        }
      } catch (error) {
        return {
          error,
          ok: false,
          product: null,
          clapped: false,
          comments: null
        };
      }
    }
  }
};

export default resolvers;
