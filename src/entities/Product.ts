import { IsUrl } from "class-validator";
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  RelationCount
} from "typeorm";
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

  @Column({ type: "text", unique: true, nullable: true })
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

  @Column({ nullable: true })
  launchedAt: Date;

  @Column({ type: "text", nullable: true, unique: true })
  slug: string;

  get pendingGoals() {
    return this.goals.filter(goal => goal.isCompleted === false);
  }

  get completedGoals() {
    return this.goals.filter(goal => goal.isCompleted === true);
  }

  @BeforeInsert()
  makeSlug() {
    this.slug = `${this.name.replace(" ", "-")}-${Math.floor(
      Math.random() * 100000
    ).toString()}`;
  }
}

export default Product;
