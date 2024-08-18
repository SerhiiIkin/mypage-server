import { Router } from "express";

import userRouter from "./user.routes.js";
import adminRouter from "./admin.routes.js";
import imagesRouter from "./images.routes.js";
import projectsRouter from "./projects.routes.js";
import donateRouter from "./donate.routes.js";
import forsideRouter from "./forside.routes.js";
import blogRouter from "./blog.routes.js";
import sectionTitleTextRouter from "./sectionTitleText.routes.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/images", imagesRouter);
router.use("/projects", projectsRouter);
router.use("/donut", donateRouter);
router.use("/forside", forsideRouter)
router.use("/blog", blogRouter)
router.use("/sectionTitleText", sectionTitleTextRouter)

export default router;
