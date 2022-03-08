import { Router } from "express";
import * as authCont from "controllers/auth";

const router = Router();

router.get("/login", authCont.login);
router.get("/register", authCont.register);

export default router;
