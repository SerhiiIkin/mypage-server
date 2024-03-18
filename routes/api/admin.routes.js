import Router from "express";

import { login } from "../../controllers/admin.js";
import { checkMyData } from "../../middlewares.js";

const route = new Router();

route.post("/", checkMyData, login);

export default route;
