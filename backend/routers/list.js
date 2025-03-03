import { Router } from 'express';
import { getListUsers } from '../controllers/list.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const listRouter = Router();

listRouter.get("/api/lists", isAuthenticated, getListUsers);

export default listRouter;