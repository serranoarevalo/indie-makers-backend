import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent
} from "typeorm";
import Abstract from "./Abstract";
import Product from "./Product";
import User from "./User";

@Entity()
@Tree("nested-set")
class Comment extends Abstract {
  @Column({ type: "text" })
  text: string;

  @TreeParent()
  parentComment: Comment;

  @TreeChildren()
  childComments: Comment[];

  @Column({ nullable: true })
  makerId: number;

  @ManyToOne(type => User, user => user.comments, {
    onDelete: "CASCADE",
    eager: true
  })
  maker: User;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(type => Product, product => product.comments, {
    onDelete: "CASCADE"
  })
  product: Product;
}

export default Comment;
