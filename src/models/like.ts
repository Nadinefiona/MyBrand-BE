import mongoose, { Schema, Document } from 'mongoose';

export interface ILike extends Document {
  blogId: string;
  userId: string;
}

const LikeSchema: Schema = new Schema({
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  userId: { type: String, required: true } 
});

export default mongoose.model<ILike>('Like', LikeSchema);
