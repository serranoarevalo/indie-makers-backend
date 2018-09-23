import { IsEmail, IsUrl } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  RelationCount
} from "typeorm";
import Abstract from "./Abstract";
import Goal from "./Goal";
import Product from "./Product";

@Entity()
class User extends Abstract {
  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "text", unique: true, nullable: true })
  username: string;

  @Column({ type: "text", nullable: true })
  firstName: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  @Column({ type: "text", nullable: true })
  @IsUrl()
  homepage: string;

  @Column({ type: "text" })
  fbId: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @OneToMany(type => Product, product => product.maker)
  products: Product[];

  @RelationCount((user: User) => user.products, "products", qb =>
    qb.andWhere("products.isLaunched = :isLaunched", {
      isLaunched: true
    })
  )
  launchedProductCount: number;

  @Column({ type: "int", default: 0 })
  streak: number;

  @OneToMany(type => Goal, goal => goal.maker)
  goals: Goal[];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get profilePhoto(): string {
    return `https://graph.facebook.com/${this.fbId}/picture?type=square`;
  }

  get pendingGoals() {
    return this.goals.filter(goal => goal.isCompleted === false);
  }

  get completedGoals() {
    return this.goals.filter(goal => goal.isCompleted === true);
  }

  @BeforeUpdate()
  @BeforeInsert()
  formatFields() {
    if (this.firstName) {
      this.firstName = `${this.firstName[0].toUpperCase()}${this.firstName.substring(
        1
      )}`;
    }
    if (this.lastName) {
      this.lastName = `${this.lastName[0].toUpperCase()}${this.lastName.substring(
        1
      )}`;
    }
    if (this.bio) {
      this.bio = `${this.bio[0].toUpperCase()}${this.bio.substring(1)}`;
    }
  }
}

export default User;
