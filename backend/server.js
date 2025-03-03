import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import authRouter from "./routers/auth.js";
import MongoStore from 'connect-mongo';
import connectDB from "./config/databases.js";
import listRouter from "./routers/list.js";
import homeRouter from "./routers/home.js";
import cors from "cors";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(session({
  name : 'session_token',
  secret : 'session_token',
  resave :true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie : { maxAge : 180 * 60 * 1000 } 
}));

app.locals.pretty = (NODE_ENV !== 'production');
app.use(express.static(path.join(__dirname, "public")));

// ==========
// App routers
// ==========

app.use("/", homeRouter);
app.use("/api/auth", authRouter);
app.use("/api/lists", listRouter);

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
