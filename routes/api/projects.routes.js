import Router from "express";
import { getAllProjects, projectCreate, projectDelete, getOneProject,updateProject } from "../../controllers/projects.js";

const route = new Router();

route.post("/", projectCreate);
route.get("/", getAllProjects);
route.delete("/:id", projectDelete);
route.get("/:id", getOneProject);
route.put("/:id", updateProject);

export default route;
