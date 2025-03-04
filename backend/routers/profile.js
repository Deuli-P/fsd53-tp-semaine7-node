import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { getChangeProfile } from '../controllers/profile.js';

const profileRouter = Router();

profileRouter.put("/edit", isAuthenticated, getChangeProfile);

export default profileRouter;