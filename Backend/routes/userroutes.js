import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { getCurrentUser, editProfile } from '../controller/usercontroller.js';
import { upload } from "../middleware/multer.js";


export const userRouter = express.Router();

// Get current user
userRouter.get("/users", isAuth, getCurrentUser);

// Edit profile (including avatar)
userRouter.post(
    "/useredit-profile",
    isAuth,
    upload.single("avatar"),
    editProfile
);





export default userRouter;