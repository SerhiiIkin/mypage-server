import Router from "express";
import {
    getAllProjects,
    projectCreate,
    projectDelete,
    getOneProject,
    updateProject,
    createComment,
    createReply,
    deleteComment,
    deleteReply,
    updateComment,
    updateReply,
} from "../../controllers/projects.js";

const route = new Router();

route.post("/", projectCreate);
route.post("/comment", createComment);
route.post("/reply", createReply);

route.get("/", getAllProjects);

route.delete("/:id", projectDelete);
route.delete("/comment/:id", deleteComment);
route.delete("/reply/:id", deleteReply);

route.get("/:id", getOneProject);

route.put("/comment", updateComment);
route.put("/reply", updateReply);
route.put("/:id", updateProject);

export default route;
