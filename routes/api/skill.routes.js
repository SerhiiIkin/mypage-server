import { Router } from "express";
import { createSkill,getSkills,updateSkill } from "../../controllers/skills.js";
const route = new Router();

route.post("/skill", createSkill);
route.get("/skill", getSkills);
route.put("/skill", updateSkill);

export default route;
