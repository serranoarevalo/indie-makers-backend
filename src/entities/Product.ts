import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  RelationCount
} from "typeorm";
import Abstract from "./Abstract";
import Comment from "./Comment";
import Goal from "./Goal";
import User from "./User";
import Vote from "./Vote";

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

  @Column({ type: "text", nullable: true })
  website: string | null;

  @Column({ type: "text", nullable: true })
  logo: string | null;

  @Column({ nullable: true })
  makerId: number;

  @ManyToOne(type => User, user => user.products, { onDelete: "CASCADE" })
  maker: User;

  @OneToMany(type => Goal, goal => goal.product, { onDelete: "CASCADE" })
  goals: Goal[];

  @OneToMany(type => Comment, comment => comment.product, {
    onDelete: "CASCADE"
  })
  comments: Comment[];

  @OneToMany(type => Vote, vote => vote.product, {
    onDelete: "CASCADE"
  })
  votes: Vote[];

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

  @RelationCount((product: Product) => product.comments)
  commentCount: number;

  @RelationCount((product: Product) => product.votes)
  voteCount: number;

  @Column({ nullable: true })
  launchedAt: string;

  @Column({ type: "text", nullable: true })
  bs: string;

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

  @BeforeInsert()
  beforeInsert() {
    this.formatFields();
  }

  formatFields() {
    this.slug = this.formatSlug();
    this.name = this.formatName(this.name);
    this.description = this.formatDescription(this.description);
  }

  saveFormatFields(name: string, description: string) {
    const newSlug = this.formatSlug();
    const newName = this.formatName(name);
    const newDescription = this.formatDescription(description);
    return { newSlug, newName, newDescription };
  }

  formatSlug = () =>
    `${this.name[0].toLowerCase()}${Math.random()
      .toString(36)
      .substr(2)}`;

  formatName = (name: string) =>
    `${name[0].toUpperCase()}${this.name.substring(1)}`;

  formatDescription = (description: string) =>
    `${this.description[0].toUpperCase()}${this.description.substring(1)}`;
}

export default Product;
