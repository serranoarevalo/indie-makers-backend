import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Abstract from "./Abstract";
import Product from "./Product";
import User from "./User";

@Entity()
class Comment extends Abstract {
  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => Comment, category => category.childComments, {
    nullable: true,
    onDelete: "CASCADE"
  })
  parentComment: Comment;

  @OneToMany(type => Comment, category => category.parentComment, {
    nullable: true
  })
  childComments: Comment[];

  @Column({ nullable: true })
  makerId: number;

  @ManyToOne(type => User, user => user.comments, { onDelete: "CASCADE" })
  maker: User;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(type => Product, product => product.comments, {
    onDelete: "CASCADE"
  })
  product: Product;
}

export default Comment;
