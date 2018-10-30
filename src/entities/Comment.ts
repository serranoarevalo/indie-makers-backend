import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Abstract from "./Abstract";
import Product from "./Product";
import User from "./User";

@Entity()
class Comment extends Abstract {
  @Column({ type: "text" })
  text: string;

  @Column({ nullable: true })
  makerId: number;

  @ManyToOne(type => Comment, category => category.childComments)
  parentComment: Comment;

  @OneToMany(type => Comment, category => category.parentComment)
  childComments: Comment[];

  @ManyToOne(type => User, user => user.comments, { onDelete: "CASCADE" })
  maker: User;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(type => Product, product => product.comments, {
    eager: true,
    onDelete: "CASCADE"
  })
  product: Product;
}

export default Comment;
