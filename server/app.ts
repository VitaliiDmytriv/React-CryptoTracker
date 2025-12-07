import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./src/config/cors";
import router from "./src/routes";

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(router);

export default app;
