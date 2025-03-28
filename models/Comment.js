import { Schema, model } from "mongoose";

const Comment = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    likes: { type: Number, required: true },
    logo: { type: String, required: true },
    replies: { type: Array,  ref: "Comment" },
    isReply: { type: Boolean, required: true },
    idComment: { type: String, required: true },
    userId: { type: String, required: true },
});

export default model("Comment", Comment);
