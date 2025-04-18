import { login, register, logout } from "../controllers/user.controller.js";
import {isAuthenticated }from '../middleware/isAuthenticated.js';
import { Router } from "express";
import { loginwithgoogel } from "../Utility/googelogin.js";

const router = Router();

// Public routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/googleLogin").post(loginwithgoogel);
// Protected route
router.route("/logout").post(isAuthenticated, logout);
export default router;
