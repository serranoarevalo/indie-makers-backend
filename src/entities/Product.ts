import { IsUrl } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, RelationCount } from "typeorm";
import Abstract from "./Abstract";
import Goal from "./Goal";
import User from "./User";

@Entity()
class Product extends Abstract {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "boolean", default: false })
  isLaunched: boolean;

  @Column({ type: "boolean", default: false })
  needsHelp: boolean;

  @Column({ type: "boolean", default: false })
  isFeatured: boolean;

  @Column({ type: "text", unique: true })
  @IsUrl()
  website: string;

  @Column({ type: "text", nullable: true })
  @IsUrl()
  logo: string;

  @Column({ nullable: true })
  makerId: number;

  @ManyToOne(type => User, user => user.products)
  maker: User;

  @OneToMany(type => Goal, goal => goal.product)
  goals: Goal[];

  @RelationCount((product: Product) => product.goals)
  goalCount: number;

  @RelationCount((product: Product) => product.goals, "goals", queryBuilder =>
    queryBuilder.andWhere("goals.isCompleted = :isCompleted", {
      isCompleted: false
    })
  )
  pendingGoalCount: number;

  @RelationCount((product: Product) => product.goals, "goals", queryBuilder =>
    queryBuilder.andWhere("goals.isCompleted = :isCompleted", {
      isCompleted: true
    })
  )
  completedGoalCount: number;

  get slug(): string {
    return `${this.name.replace(" ", "-")}`;
  }

  pendingGoals = async (): Promise<Goal[]> => {
    const goals = await Goal.find({ productId: this.id, isCompleted: false });
    return goals;
  };

  completedGoals = async (): Promise<Goal[]> => {
    return await Goal.find({ productId: this.id, isCompleted: true });
  };
}

export default Product;
