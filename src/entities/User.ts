import { IsEmail } from "class-validator";
import { Column, Entity, OneToMany, RelationCount } from "typeorm";
import Abstract from "./Abstract";
import Goal from "./Goal";
import Product from "./Product";

@Entity()
class User extends Abstract {
  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string;

  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text", nullable: false })
  firstName: string;

  @Column({ type: "text", nullable: false })
  lastName: string;

  @Column({ type: "text" })
  fbId: string;

  @Column({ type: "text" })
  bio: string;

  @OneToMany(type => Product, product => product.maker)
  products: Product[];

  @RelationCount((user: User) => user.products, "products", queryBuilder =>
    queryBuilder.andWhere("products.isLaunched = :isLaunched", {
      isLaunched: true
    })
  )
  launchedProductCount: number;

  @OneToMany(type => Goal, goal => goal.maker)
  goals: Goal[];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get profilePhoto(): string {
    return `https://graph.facebook.com/${this.fbId}/picture?type=square`;
  }

  get strike(): number {
    return 1;
  }

  async pendingGoals(): Promise<Goal[]> {
    return await Goal.find({ makerId: this.id, isCompleted: false });
  }

  async completedGoals(): Promise<Goal[]> {
    return await Goal.find({ makerId: this.id, isCompleted: true });
  }
}

export default User;
