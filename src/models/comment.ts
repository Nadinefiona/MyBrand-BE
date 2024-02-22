import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  blogId: string;
  name: string;
  email: string;
  comment: string;
  hidden: boolean;
}

const commentSchema: Schema = new Schema({
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  hidden: { type: Boolean, default: false },
});

export default mongoose.model<IComment>('Comment', commentSchema);
