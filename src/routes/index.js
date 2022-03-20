import { Router } from "express";

import auth from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ url: req.originalUrl });
});

router.use("/auth", auth);

export default router;
