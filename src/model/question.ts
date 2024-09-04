import { Schema, model, Document } from 'mongoose';

export interface IQuestion extends Document {
    title: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
    title: { type: String, required: true },
    answer: { type: String, required: true },
}, {timestamps: true});
questionSchema.index({ createdAt: -1 });
questionSchema.index({ updatedAt: -1 });

export const Question = model<IQuestion>('Question', questionSchema);
