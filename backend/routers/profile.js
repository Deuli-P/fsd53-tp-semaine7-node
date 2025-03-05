import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { getChangeProfile, getProfileUser } from '../controllers/profile.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const profileRouter = Router();

profileRouter.get("/:id", isAuthenticated, isAdmin, getProfileUser);
profileRouter.put("/edit", isAuthenticated, getChangeProfile);

export default profileRouter;