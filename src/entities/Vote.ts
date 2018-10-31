import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Product from "./Product";
import User from "./User";

@Entity()
class Vote extends Abstract {
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

export default Vote;
