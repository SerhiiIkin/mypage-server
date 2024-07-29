import { Schema, model } from "mongoose";

const Token = new Schema({
    value: { type: String, required: true, unique: true },
    expiry: { type: Number, required: true },
    message: { type: String, require: true },
    role: { type: String, default: "user" },
});

export default model("Token", Token);
