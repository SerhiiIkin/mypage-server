import { createJob, getJobs, updateJob, deleteJob } from "../../controllers/job.js";
import { Router } from "express";

const route = new Router();

route.post("/", createJob);
route.get("/", getJobs);
route.put("/", updateJob);
route.delete("/:id", deleteJob);


export default route;
