import { Router, type IRouter } from "express";
import healthRouter from "./health";
import browsRouter from "./brows";

const router: IRouter = Router();

router.use(healthRouter);
router.use(browsRouter);

export default router;
