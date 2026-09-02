import express from "express";
import { logIn, logOut, refresh, register } from "../controllers/auth.controller.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', logIn);
router.post('/logout', logOut);
router.post('/refresh', refresh)

export default router;