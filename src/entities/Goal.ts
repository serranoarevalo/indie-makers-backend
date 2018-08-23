import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Product from "./Product";
import User from "./User";

@Entity()
class Goal extends Abstract {
  @Column({ type: "text" })
  text: string;

  @Column({ type: "boolean", default: false })
  isCompleted: boolean;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  makerId: number;

  @ManyToOne(type => User, user => user.goals)
  maker: User;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(type => Product, product => product.goals)
  product: Product;
}

export default Goal;
