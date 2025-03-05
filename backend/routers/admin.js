import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { deleteProfileUser, adminChangeProfile, AmIAdmin } from '../controllers/admin.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const adminRouter = Router();

adminRouter.get('/me', isAdmin, AmIAdmin)
adminRouter.put("/edit", isAdmin, adminChangeProfile);
adminRouter.delete('/delete', isAdmin, deleteProfileUser);

export default adminRouter;