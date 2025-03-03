import express from "express";
import { getRandomUser } from "../controllers/home.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
const homeRouter = express.Router();



homeRouter.post('/', isAuthenticated, getRandomUser);


export default homeRouter;
