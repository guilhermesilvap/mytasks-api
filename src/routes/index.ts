import { Router } from "express";
import { tasksRoutes } from "./tasks-routes";
import { userRoutes } from "./users-routes";
import { sessionRoutes } from "./session-routes";
import { requireAuth } from "@/middlewares/requireAuth";

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)

routes.use(requireAuth)
routes.use("/tasks", tasksRoutes)


export {routes}