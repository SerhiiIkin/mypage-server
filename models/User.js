import { Schema, model } from "mongoose";

const User = new Schema({
    username: { type: String, required: true },
    roomId: { type: String, unique: true },
    messages: [{ type: Object, ref: "Message" }],
    role: { type: String, default: "user" },
    token: { type: Object, ref: "Token" },
});

export default model("User", User);
