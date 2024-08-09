import Router from "express";
import { updateForsideWelcomeDescription, getForsideWelcomeDescription } from "../../controllers/forside.js";


const route = new Router();


route.put("/welcome/description/", updateForsideWelcomeDescription);
route.get("/welcome/description/", getForsideWelcomeDescription);

export default route;
