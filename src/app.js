import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import organizationRoutes from "./modules/organization/organization.route.js";
import boardRoutes from "./modules/boards/board.route.js";
import columnRoutes from "./modules/columns/column.route.js";
import taskRoutes from "./modules/tasks/task.route.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors"

const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(errorHandler)

export default app;
