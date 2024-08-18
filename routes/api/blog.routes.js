import Router from "express";
import jobRouter from "../api/job.routes.js";

const route = new Router();

route.use("/job", jobRouter)

export default route;
