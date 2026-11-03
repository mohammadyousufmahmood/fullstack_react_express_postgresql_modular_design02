// app.js is responsible for creating and configuring your Express application.
// It brings together middleware, security settings, request handling, and routes.
// It does not start the server. Your server.js (or index.js) is responsible for starting it.

import express, { json } from "express";
import cors from "cors";
import { env } from "./config/env";
import authRoutes from "./module/auth/authRoutes";
import userRoutes from "./module/user/userRoutes";

function createApp() {
  const app = express();
  app.disable("x-powered-by");

  // This tells Express to register middleware.
  app.use(cors({
    origin: env.frontEndOrigin,
    credentials: true
   }));

  app.use(json({ limit: "10mb" }));

  // Register your routes
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);

  return app;
}


export default { createApp };
