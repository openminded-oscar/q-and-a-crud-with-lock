import { model, Schema } from 'mongoose';

interface TimedDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
}

interface LockableDocument extends Document {
    lockExpiresAt?: Date;
    lockId?: string;
}

export interface IQuestion extends LockableDocument, TimedDocument {
    title: string;
    answer: string;
    editStartedAt?: Date;
}

const questionSchema = new Schema<IQuestion>({
    title: { type: String, required: true, maxlength: 500 },
    answer: { type: String, required: true, maxlength: 1000 },
    editStartedAt: { type: Date },
    lockId: { type: String, required: false},
    lockExpiresAt: { type: Date, required: false},
}, {timestamps: true});
questionSchema.index({ createdAt: -1 });
questionSchema.index({ updatedAt: -1 });

export const Question = model<IQuestion>('Question', questionSchema);
