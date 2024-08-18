import { Schema, model } from "mongoose";

const SectionTitleText = new Schema({
    key: { type: String, required: true },
    title: { type: Object, required: true, ref: "Text" },
    description: { type: Object, required: true, ref: "Text" },
});

export default model("SectionTitleText", SectionTitleText);
