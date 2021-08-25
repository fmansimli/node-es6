import { Router } from "express";

const router = Router();

router.get("/login", (req, res, next) => {
  res.status(200).json({ isLogin: true });
});

export default router;
