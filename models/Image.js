import { Schema, model } from "mongoose";

const Image = new Schema({
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
});

export default model("Image", Image);
