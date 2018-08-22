export const typeDefs = ["type Goal {\n  id: Int!\n  createdAt: String!\n  updatedAt: String\n  text: String!\n  isCompleted: Boolean!\n  makerId: Int!\n  maker: User\n  productId: Int!\n  product: Product\n}\n\nenum ProductState {\n  NEW\n  UPDATED\n  LAUNCHED\n  HELP\n  FEATURED\n}\n\ntype FilterProductsResponse {\n  ok: Boolean!\n  error: String\n  products: [Product]\n}\n\ntype Query {\n  FilterProducts(status: ProductState!, page: Int!): FilterProductsResponse!\n  CheckUsername(username: String!): CheckUsernameResponse!\n  FilterUsers(status: UserState!, page: Int!): FilterUsersResponse!\n  GetMaker(username: String!): GetMakerResponse!\n}\n\ntype Product {\n  id: Int!\n  createdAt: String!\n  updatedAt: String\n  name: String!\n  description: String!\n  isLaunched: Boolean!\n  needsHelp: Boolean!\n  isFeatured: Boolean!\n  website: String\n  logo: String\n  makerId: Int!\n  maker: User\n  goals: [Goal]\n  goalCount: Int!\n  pendingGoalCount: Int!\n  completedGoalCount: Int!\n  slug: String!\n  pendingGoals: [Goal]\n  completedGoals: [Goal]\n}\n\ntype CheckUsernameResponse {\n  ok: Boolean!\n  available: Boolean\n  error: String\n}\n\ntype ConnectFBResponse {\n  ok: Boolean!\n  error: String\n  token: String\n  new: Boolean!\n}\n\ntype Mutation {\n  ConnectFB(firstName: String!, lastName: String!, email: String, fbId: String!): ConnectFBResponse!\n}\n\nenum UserState {\n  FIRE\n  SHIPPED\n}\n\ntype FilterUsersResponse {\n  ok: Boolean!\n  error: String\n  makers: [User]\n}\n\ntype GetMakerResponse {\n  ok: Boolean!\n  error: String\n  maker: User\n}\n\ntype User {\n  id: Int!\n  email: String\n  username: String\n  firstName: String!\n  lastName: String!\n  homepage: String\n  fbId: String!\n  bio: String\n  products: [Product]\n  launchedProductCount: Int!\n  goals: [Goal]\n  fullName: String!\n  profilePhoto: String!\n  strike: Int!\n  pendingGoals: [Goal]\n  completedGoals: [Goal]\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  FilterProducts: FilterProductsResponse;
  CheckUsername: CheckUsernameResponse;
  FilterUsers: FilterUsersResponse;
  GetMaker: GetMakerResponse;
}

export interface FilterProductsQueryArgs {
  status: ProductState;
  page: number;
}

export interface CheckUsernameQueryArgs {
  username: string;
}

export interface FilterUsersQueryArgs {
  status: UserState;
  page: number;
}

export interface GetMakerQueryArgs {
  username: string;
}

export type ProductState = "NEW" | "UPDATED" | "LAUNCHED" | "HELP" | "FEATURED";

export interface FilterProductsResponse {
  ok: boolean;
  error: string | null;
  products: Array<Product> | null;
}

export interface Product {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  name: string;
  description: string;
  isLaunched: boolean;
  needsHelp: boolean;
  isFeatured: boolean;
  website: string | null;
  logo: string | null;
  makerId: number;
  maker: User | null;
  goals: Array<Goal> | null;
  goalCount: number;
  pendingGoalCount: number;
  completedGoalCount: number;
  slug: string;
  pendingGoals: Array<Goal> | null;
  completedGoals: Array<Goal> | null;
}

export interface User {
  id: number;
  email: string | null;
  username: string | null;
  firstName: string;
  lastName: string;
  homepage: string | null;
  fbId: string;
  bio: string | null;
  products: Array<Product> | null;
  launchedProductCount: number;
  goals: Array<Goal> | null;
  fullName: string;
  profilePhoto: string;
  strike: number;
  pendingGoals: Array<Goal> | null;
  completedGoals: Array<Goal> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Goal {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  text: string;
  isCompleted: boolean;
  makerId: number;
  maker: User | null;
  productId: number;
  product: Product | null;
}

export interface CheckUsernameResponse {
  ok: boolean;
  available: boolean | null;
  error: string | null;
}

export type UserState = "FIRE" | "SHIPPED";

export interface FilterUsersResponse {
  ok: boolean;
  error: string | null;
  makers: Array<User> | null;
}

export interface GetMakerResponse {
  ok: boolean;
  error: string | null;
  maker: User | null;
}

export interface Mutation {
  ConnectFB: ConnectFBResponse;
}

export interface ConnectFbMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface ConnectFBResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
  new: boolean;
}
