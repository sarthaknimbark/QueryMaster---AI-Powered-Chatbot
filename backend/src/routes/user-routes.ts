import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controller.js";
import {signupValidators,validate, loginValidators} from "../utils/validators.js"
import { verifyToken } from "../utils/tocken-manager.js";

const userRoutes = Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signupValidators),userSignup);
userRoutes.post("/login",validate(loginValidators),userLogin);
userRoutes.get("/auth-status",verifyToken ,verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);


export default userRoutes;