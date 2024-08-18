import { Schema, model } from "mongoose";

const Skill = new Schema({
    title: { type: String, required: true },
    list: { type: Array },
});

export default model("Skill", Skill);
