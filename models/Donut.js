import { Schema, model } from "mongoose";

const Donut = new Schema({
    title: { type: Object, required: true },
    description: { type: Object, required: true },
    link: { type: String, required: true },
    images: { type: Array, required: true, ref: "Image" },
});

export default model("Donut", Donut);
