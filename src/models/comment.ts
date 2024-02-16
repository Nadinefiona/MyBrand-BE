import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  blogId: string;
  text: string;
  hidden: boolean;
}

const commentSchema: Schema = new Schema({
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  text: { type: String, required: true },
  hidden: { type: Boolean, default: false },
});

export default mongoose.model<IComment>('Comment', commentSchema);
