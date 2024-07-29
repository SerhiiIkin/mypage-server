import { Router } from "express";
import { deleteImages, uploadImages, updateImages } from "../../controllers/images.js";
import multer from "multer";
const route = new Router();

route.delete("/", deleteImages);
route.post("/", multer().array("images", 10), uploadImages);
route.put("/",multer().array("images", 10), updateImages);

export default route;
