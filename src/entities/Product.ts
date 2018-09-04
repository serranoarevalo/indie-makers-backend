import { IsUrl } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
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
  website: string | null;

  @Column({ type: "text", nullable: true })
  @IsUrl()
  logo: string | null;

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
  launchedAt: string;

  @Column({
    type: "text",
    unique: true
  })
  slug: string;

  get pendingGoals() {
    return this.goals.filter(goal => goal.isCompleted === false);
  }

  get completedGoals() {
    return this.goals.filter(goal => goal.isCompleted === true);
  }

  @BeforeUpdate()
  @BeforeInsert()
  formatFields() {
    this.slug = `${this.name.replace(" ", "-")}-${Math.random()
      .toString(36)
      .substr(2)}`;
    this.name = `${this.name[0].toUpperCase()}${this.name.substring(1)}`;
    this.description = `${this.description[0].toUpperCase()}${this.description.substring(
      1
    )}`;
  }
}

export default Product;
