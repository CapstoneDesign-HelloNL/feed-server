import { Router } from "express";
import groupRouter from "@src/api/group";

const router = Router();

router.use("/auth", groupRouter);

export default router;
