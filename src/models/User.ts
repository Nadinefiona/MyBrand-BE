import { Document, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
    fullName: string; 
    email: string; 
    password: string;
}

const userSchema = new Schema<UserDocument>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
});

export default model<UserDocument>('User', userSchema);

export type UserType = UserDocument;
