import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Product from "./Product";
import User from "./User";

@Entity()
class Goal extends Abstract {
  @Column({ type: "text" })
  text: string;

  @Column({ type: "boolean", default: false })
  isCompleted: boolean;

  @Column({ type: "timestamp", nullable: true })
  completedAt: string;

  @Column({ nullable: true })
  makerId: number;

  @ManyToOne(type => User, user => user.goals, { onDelete: "CASCADE" })
  maker: User;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(type => Product, product => product.goals, {
    eager: true,
    onDelete: "CASCADE"
  })
  product: Product;

  @BeforeUpdate()
  @BeforeInsert()
  formatFields() {
    this.text = `${this.text[0].toUpperCase()}${this.text.substring(1)}`;
  }
}

export default Goal;
