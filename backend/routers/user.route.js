import { login, register, logout } from "../controllers/user.controller.js";
import {isAuthenticated }from '../middleware/isAuthenticated.js';
import { Router } from "express";

const router = Router();

// Public routes
router.route("/register").post(register);
router.route("/login").post(login);

// Protected route
router.route("/logout").post(isAuthenticated, logout);
export default router;
