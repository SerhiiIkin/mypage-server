import Router from "express";
import {
    createSectionTitleText,
    getAllSectionTitleText,
    updateSectionTitleText,
    getSectionTitleText,
} from "../../controllers/sectionTitleText.js";

const route = new Router();

route.post("/", createSectionTitleText);
route.get("/", getAllSectionTitleText);
route.get("/:key", getSectionTitleText);
route.put("/", updateSectionTitleText);

export default route;
