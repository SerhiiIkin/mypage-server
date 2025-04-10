import { Router } from "express";
import { deleteImages, uploadImages, updateImages, getImages } from "../../controllers/images.js";
import multer from "multer";
const route = new Router();
const MAX_IMAGES = 20;


route.delete("/", deleteImages);
route.get("/getImages", getImages);
route.post("/", multer().array("images", MAX_IMAGES), uploadImages);
route.put("/",multer().array("images", MAX_IMAGES), updateImages);

export default route;
