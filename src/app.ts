import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import router from "./router";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";

const isDev = process.env.NODE_ENV === "development";

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: req => {
        return {
          req: req.request
        };
      }
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(compression());
    this.app.express.use(cookieParser());
    this.app.express.use(
      cors({
        origin: [
          /\indiemakers\.net$/,
          /\localtunnel\.me$/,
          /\now\.sh$/,
          "http://127.0.0.1:3000"
        ],
        credentials: true
      })
    );
    this.app.express.use(helmet());
    this.app.express.use("/aws", router);
    this.app.express.use(this.jwt);
    if (isDev) {
      this.app.express.use(logger("dev"));
    }
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.cookies["X-JWT"] || req.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
        res.clearCookie("X-JWT");
      }
    }
    next();
  };
}

export default new App().app;
