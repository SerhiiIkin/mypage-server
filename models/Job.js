import { Schema, model } from "mongoose";

const Job = new Schema({
    date: { type: String, required: true },
    description: { type: Object, required: true, ref: "Text" },
});

export default model("Job", Job);
