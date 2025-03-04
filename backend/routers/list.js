import { Router } from 'express';
import { getListUsers } from '../controllers/list.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const listRouter = Router();

listRouter.get("", isAuthenticated, getListUsers);

export default listRouter;