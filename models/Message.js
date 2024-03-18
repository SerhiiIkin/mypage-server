import { Schema, model } from "mongoose";

const Message = new Schema({
    id: { type: String, required: true, unique: true },
    message: { type: String, require: true },
    username: { type: String, required: true },
    img: { type: String, require: true },
    imgAlt: { type: String, require: true },
    roomId: { type: String, required: true, unique: true },
    dato: { type: String, required: true },
    time: { type: String, required: true },
});

export default model("Message", Message);
