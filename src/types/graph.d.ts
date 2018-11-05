export const typeDefs = ["type CreateCommentResponse {\n  ok: Boolean!\n  error: String\n  comment: Comment\n}\n\ntype Mutation {\n  CreateComment(text: String!, productId: Int, commentId: Int): CreateCommentResponse!\n  DeleteComment(commentId: Int!): DeleteCommentResponse!\n  EditComment(commentId: Int!, text: String!): EditCommentResponse!\n  CreateGoal(text: String!, productId: Int!): CreateGoalResponse!\n  DeleteGoal(goalId: Int!): DeleteGoalResponse!\n  EditGoal(goalId: Int!, text: String, isCompleted: Boolean): EditGoalResponse!\n  MarkAsRead: MarkAsReadResponse!\n  CreateProduct(name: String!, description: String!, needsHelp: Boolean!, isLaunched: Boolean!, website: String, logo: String): CreateProductResponse!\n  DeleteProduct(productId: Int!): DeleteProductResponse!\n  EditProduct(slug: String!, name: String, description: String, isLaunched: Boolean, needsHelp: Boolean, website: String, logo: String): EditProductResponse!\n  ConnectFB(firstName: String!, lastName: String!, email: String, fbId: String!): ConnectFBResponse!\n  EditUser(username: String, homepage: String, bio: String): EditUserResponse!\n  ToggleVote(productId: Int!): ToggleVoteResponse!\n}\n\ntype DeleteCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Comment {\n  id: Int!\n  text: String!\n  makerId: Int\n  maker: User!\n  parentComment: Comment\n  childComments: [Comment]!\n  productId: Int\n  product: Product!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateGoalResponse {\n  ok: Boolean!\n  error: String\n  goal: Goal\n}\n\ntype DeleteGoalResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditGoalResponse {\n  ok: Boolean!\n  error: String\n  isCompleted: Boolean\n}\n\nenum GoalStatus {\n  PENDING\n  COMPLETED\n}\n\ntype FilterGoalsResponse {\n  ok: Boolean!\n  error: String\n  goals: [Goal]\n  page: Int!\n  totalPages: Int!\n}\n\ntype Query {\n  FilterGoals(status: GoalStatus!, page: Int, take: Int): FilterGoalsResponse!\n  GetLatestGoals(take: Int, page: Int): GetLatestGoalsResponse!\n  GetNotifications: GetNotificationsResponse!\n  FilterProducts(status: ProductState!, page: Int, take: Int): FilterProductsResponse!\n  GetAllProducts: GetAllProductsResponse!\n  GetLatestProducts(take: Int, page: Int): GetLatestProductsResponse!\n  GetProduct(slug: String!): GetProductResponse!\n  CheckUsername(username: String!): CheckUsernameResponse!\n  FilterUsers(status: UserState!, page: Int, take: Int): FilterUsersResponse!\n  GetMaker(username: String!): GetMakerResponse!\n  Me: MeResponse!\n}\n\ntype GetLatestGoalsResponse {\n  ok: Boolean!\n  error: String\n  goals: [Goal]\n}\n\ntype Goal {\n  id: Int!\n  createdAt: String!\n  updatedAt: String\n  completedAt: String\n  text: String!\n  isCompleted: Boolean!\n  makerId: Int!\n  maker: User\n  productId: Int!\n  product: Product\n}\n\ntype GetNotificationsResponse {\n  ok: Boolean!\n  error: String\n  notifications: [Notification]\n  unseen: Int\n}\n\ntype MarkAsReadResponse {\n  ok: Boolean!\n}\n\ntype Notification {\n  id: String!\n  actor: String!\n  target: String!\n  verb: String!\n  object: String!\n  time: String!\n  isSeen: Boolean!\n}\n\ntype CreateProductResponse {\n  ok: Boolean!\n  error: String\n  product: Product\n}\n\ntype DeleteProductResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditProductResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum ProductState {\n  NEW\n  UPDATED\n  LAUNCHED\n  HELP\n  FEATURED\n}\n\ntype FilterProductsResponse {\n  ok: Boolean!\n  error: String\n  products: [Product]\n  page: Int!\n  totalPages: Int!\n}\n\ntype GetAllProductsResponse {\n  ok: Boolean!\n  error: String\n  products: [Product]\n}\n\ntype GetLatestProductsResponse {\n  ok: Boolean!\n  error: String\n  products: [Product]\n}\n\ntype GetProductResponse {\n  ok: Boolean!\n  error: String\n  product: Product\n  clapped: Boolean!\n}\n\ntype Product {\n  id: Int!\n  createdAt: String!\n  updatedAt: String\n  name: String!\n  description: String!\n  isLaunched: Boolean!\n  needsHelp: Boolean!\n  isFeatured: Boolean!\n  website: String\n  logo: String\n  makerId: Int!\n  maker: User\n  goals: [Goal]\n  goalCount: Int!\n  pendingGoalCount: Int!\n  completedGoalCount: Int!\n  slug: String!\n  pendingGoals: [Goal]\n  completedGoals: [Goal]\n  comments: [Comment]\n  commentCount: Int!\n  voteCount: Int!\n  votes: [Vote]\n}\n\ntype CheckUsernameResponse {\n  ok: Boolean!\n  available: Boolean\n  error: String\n}\n\ntype ConnectFBResponse {\n  ok: Boolean!\n  error: String\n  token: String\n  isNew: Boolean!\n}\n\ntype EditUserResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum UserState {\n  UPDATED\n  FIRE\n  SHIPPED\n}\n\ntype FilterUsersResponse {\n  ok: Boolean!\n  error: String\n  makers: [User]\n  page: Int!\n  totalPages: Int!\n}\n\ntype GetMakerResponse {\n  ok: Boolean!\n  error: String\n  maker: User\n}\n\ntype MeResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  email: String\n  username: String!\n  firstName: String!\n  lastName: String!\n  homepage: String\n  fbId: String!\n  bio: String\n  products: [Product]\n  launchedProductCount: Int!\n  goals: [Goal]\n  fullName: String!\n  profilePhoto: String!\n  streak: Int!\n  pendingGoals: [Goal]\n  completedGoals: [Goal]\n  createdAt: String!\n  updatedAt: String\n  comments: [Comment]\n}\n\ntype Vote {\n  id: Int!\n  makerId: Int\n  maker: User!\n  productId: Int\n  product: Product!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype ToggleVoteResponse {\n  ok: Boolean!\n  error: String\n  add: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  FilterGoals: FilterGoalsResponse;
  GetLatestGoals: GetLatestGoalsResponse;
  GetNotifications: GetNotificationsResponse;
  FilterProducts: FilterProductsResponse;
  GetAllProducts: GetAllProductsResponse;
  GetLatestProducts: GetLatestProductsResponse;
  GetProduct: GetProductResponse;
  CheckUsername: CheckUsernameResponse;
  FilterUsers: FilterUsersResponse;
  GetMaker: GetMakerResponse;
  Me: MeResponse;
}

export interface FilterGoalsQueryArgs {
  status: GoalStatus;
  page: number | null;
  take: number | null;
}

export interface GetLatestGoalsQueryArgs {
  take: number | null;
  page: number | null;
}

export interface FilterProductsQueryArgs {
  status: ProductState;
  page: number | null;
  take: number | null;
}

export interface GetLatestProductsQueryArgs {
  take: number | null;
  page: number | null;
}

export interface GetProductQueryArgs {
  slug: string;
}

export interface CheckUsernameQueryArgs {
  username: string;
}

export interface FilterUsersQueryArgs {
  status: UserState;
  page: number | null;
  take: number | null;
}

export interface GetMakerQueryArgs {
  username: string;
}

export type GoalStatus = "PENDING" | "COMPLETED";

export interface FilterGoalsResponse {
  ok: boolean;
  error: string | null;
  goals: Array<Goal> | null;
  page: number;
  totalPages: number;
}

export interface Goal {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  completedAt: string | null;
  text: string;
  isCompleted: boolean;
  makerId: number;
  maker: User | null;
  productId: number;
  product: Product | null;
}

export interface User {
  id: number;
  email: string | null;
  username: string;
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
  streak: number;
  pendingGoals: Array<Goal> | null;
  completedGoals: Array<Goal> | null;
  createdAt: string;
  updatedAt: string | null;
  comments: Array<Comment> | null;
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
  comments: Array<Comment> | null;
  commentCount: number;
  voteCount: number;
  votes: Array<Vote> | null;
}

export interface Comment {
  id: number;
  text: string;
  makerId: number | null;
  maker: User;
  parentComment: Comment | null;
  childComments: Array<Comment>;
  productId: number | null;
  product: Product;
  createdAt: string;
  updatedAt: string | null;
}

export interface Vote {
  id: number;
  makerId: number | null;
  maker: User;
  productId: number | null;
  product: Product;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetLatestGoalsResponse {
  ok: boolean;
  error: string | null;
  goals: Array<Goal> | null;
}

export interface GetNotificationsResponse {
  ok: boolean;
  error: string | null;
  notifications: Array<Notification> | null;
  unseen: number | null;
}

export interface Notification {
  id: string;
  actor: string;
  target: string;
  verb: string;
  object: string;
  time: string;
  isSeen: boolean;
}

export type ProductState = "NEW" | "UPDATED" | "LAUNCHED" | "HELP" | "FEATURED";

export interface FilterProductsResponse {
  ok: boolean;
  error: string | null;
  products: Array<Product> | null;
  page: number;
  totalPages: number;
}

export interface GetAllProductsResponse {
  ok: boolean;
  error: string | null;
  products: Array<Product> | null;
}

export interface GetLatestProductsResponse {
  ok: boolean;
  error: string | null;
  products: Array<Product> | null;
}

export interface GetProductResponse {
  ok: boolean;
  error: string | null;
  product: Product | null;
  clapped: boolean;
}

export interface CheckUsernameResponse {
  ok: boolean;
  available: boolean | null;
  error: string | null;
}

export type UserState = "UPDATED" | "FIRE" | "SHIPPED";

export interface FilterUsersResponse {
  ok: boolean;
  error: string | null;
  makers: Array<User> | null;
  page: number;
  totalPages: number;
}

export interface GetMakerResponse {
  ok: boolean;
  error: string | null;
  maker: User | null;
}

export interface MeResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  CreateComment: CreateCommentResponse;
  DeleteComment: DeleteCommentResponse;
  EditComment: EditCommentResponse;
  CreateGoal: CreateGoalResponse;
  DeleteGoal: DeleteGoalResponse;
  EditGoal: EditGoalResponse;
  MarkAsRead: MarkAsReadResponse;
  CreateProduct: CreateProductResponse;
  DeleteProduct: DeleteProductResponse;
  EditProduct: EditProductResponse;
  ConnectFB: ConnectFBResponse;
  EditUser: EditUserResponse;
  ToggleVote: ToggleVoteResponse;
}

export interface CreateCommentMutationArgs {
  text: string;
  productId: number | null;
  commentId: number | null;
}

export interface DeleteCommentMutationArgs {
  commentId: number;
}

export interface EditCommentMutationArgs {
  commentId: number;
  text: string;
}

export interface CreateGoalMutationArgs {
  text: string;
  productId: number;
}

export interface DeleteGoalMutationArgs {
  goalId: number;
}

export interface EditGoalMutationArgs {
  goalId: number;
  text: string | null;
  isCompleted: boolean | null;
}

export interface CreateProductMutationArgs {
  name: string;
  description: string;
  needsHelp: boolean;
  isLaunched: boolean;
  website: string | null;
  logo: string | null;
}

export interface DeleteProductMutationArgs {
  productId: number;
}

export interface EditProductMutationArgs {
  slug: string;
  name: string | null;
  description: string | null;
  isLaunched: boolean | null;
  needsHelp: boolean | null;
  website: string | null;
  logo: string | null;
}

export interface ConnectFbMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface EditUserMutationArgs {
  username: string | null;
  homepage: string | null;
  bio: string | null;
}

export interface ToggleVoteMutationArgs {
  productId: number;
}

export interface CreateCommentResponse {
  ok: boolean;
  error: string | null;
  comment: Comment | null;
}

export interface DeleteCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface EditCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateGoalResponse {
  ok: boolean;
  error: string | null;
  goal: Goal | null;
}

export interface DeleteGoalResponse {
  ok: boolean;
  error: string | null;
}

export interface EditGoalResponse {
  ok: boolean;
  error: string | null;
  isCompleted: boolean | null;
}

export interface MarkAsReadResponse {
  ok: boolean;
}

export interface CreateProductResponse {
  ok: boolean;
  error: string | null;
  product: Product | null;
}

export interface DeleteProductResponse {
  ok: boolean;
  error: string | null;
}

export interface EditProductResponse {
  ok: boolean;
  error: string | null;
}

export interface ConnectFBResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
  isNew: boolean;
}

export interface EditUserResponse {
  ok: boolean;
  error: string | null;
}

export interface ToggleVoteResponse {
  ok: boolean;
  error: string | null;
  add: boolean;
}
