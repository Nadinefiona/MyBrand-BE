import { Schema, model } from "mongoose";
import { IBlog } from "../types/BlogType";

const schema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  date: { type: Date, default: Date.now }
   

});

export default model<IBlog>("Blog", schema);
