import { Router } from "express";

import sendEmailRouter from "./sendEmail.routes.js";
import userRouter from "./user.routes.js";
import adminRouter from "./admin.routes.js";

const router = new Router();

router.use(sendEmailRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);

export default router;
