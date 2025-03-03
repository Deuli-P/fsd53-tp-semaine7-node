import express from "express";
import { getLogout, postLogin } from "../controllers/login.js";
const authRouter = express.Router();


authRouter.post('/login', postLogin);

authRouter.get('/logout', getLogout);



export default authRouter;
