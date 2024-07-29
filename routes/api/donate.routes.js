import Router from "express";
import {
    donutCreate,
    donutDelete,
    getOneDonut,
    getAllDonuts,
    updateDonut,
} from "../../controllers/donate.js";

const route = new Router();

route.post("/", donutCreate);
route.get("/", getAllDonuts);
route.delete("/:id", donutDelete);
route.get("/:id", getOneDonut);
route.put("/:id", updateDonut);

export default route;
