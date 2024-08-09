import { Schema, model } from "mongoose";

const Description = new Schema({
    ukr: { type: String, required: true },
    eng: { type: String, required: true },
    dk: { type: String, required: true },
});

export default model("Description", Description);
