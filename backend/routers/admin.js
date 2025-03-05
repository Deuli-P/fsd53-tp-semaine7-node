import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { deleteProfileUser, adminChangeProfile } from '../controllers/admin.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const adminRouter = Router();

adminRouter.put("/edit", isAdmin, adminChangeProfile);
adminRouter.get('/deleted', isAdmin, deleteProfileUser);

export default adminRouter;