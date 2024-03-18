import { Schema, model } from "mongoose";

const Token = new Schema({
    value: { type: String, required: true, unique: true },
    expiry: { type: Number, required: true },
    message: { type: String, require: true },
});

export default model("Token", Token);
