import Router from "express";
import {
    updateForsideWelcomeDescription,
    getForsideWelcomeDescription,
} from "../../controllers/forside.js";
import skillRoutes from "./skill.routes.js";

const route = new Router();

route.put("/welcome/description/", updateForsideWelcomeDescription);
route.get("/welcome/description/", getForsideWelcomeDescription);
route.use("/welcome", skillRoutes);

export default route;
