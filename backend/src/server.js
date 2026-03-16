import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import routes from "./routes/index.js";

import { runAuctionScheduler } from "./scheduler/auctionScheduler.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

routes(app);

app.use("/uploads", express.static("uploads"));

runAuctionScheduler();

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);