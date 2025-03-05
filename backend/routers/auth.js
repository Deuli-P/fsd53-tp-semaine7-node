import express from "express";
import { getCheck, getLogout, postLogin } from "../controllers/login.js";
const authRouter = express.Router();


authRouter.get('/check', getCheck )
authRouter.post('/login', postLogin);
authRouter.get('/logout', getLogout);

export default authRouter;
