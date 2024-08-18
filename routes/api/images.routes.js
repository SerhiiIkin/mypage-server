import { Router } from "express";
import { deleteImages, uploadImages, updateImages, getImages } from "../../controllers/images.js";
import multer from "multer";
const route = new Router();

route.delete("/", deleteImages);
route.get("/getImages", getImages);
route.post("/", multer().array("images", 10), uploadImages);
route.put("/",multer().array("images", 10), updateImages);

export default route;
