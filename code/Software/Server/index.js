import express from "express";
import { PORT } from "./config/app.js";

import connection from "./config/database.js";
// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
import "dotenv/config";

import userRouter from "./routes/userRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for handling routes
app.use("/users", userRouter);

connection.on("connected", () => {
    app.listen(PORT, () => {
        console.log(`app is listening on port ${PORT}`);
    });
});