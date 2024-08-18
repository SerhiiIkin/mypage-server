import { Schema, model } from "mongoose";

const Project = new Schema({
    title: { type: Object, required: true },
    description: { type: Object, required: true, ref: "Text" },
    link: { type: String, required: true },
    images: { type: Array, required: true, ref: "Image" },
    isFavorite: { type: Boolean, required: true },
});

export default  model("Project", Project);
