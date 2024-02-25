import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILike extends Document {
  blogId: string;
}

interface ILikeModel extends Model<ILike> {
  incrementLikeCount(blogId: string): Promise<void>;
}

const LikeSchema: Schema = new Schema({
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true }
});

LikeSchema.statics.incrementLikeCount = async function(blogId: string): Promise<void> {
  await this.create({ blogId }); 
};

export default mongoose.model<ILike, ILikeModel>('Like', LikeSchema);
