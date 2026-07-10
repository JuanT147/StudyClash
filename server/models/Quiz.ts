import mongoose, { type Model } from 'mongoose';
import type { TriviaQuestion } from '../types.js';

const { model, models, Schema } = mongoose;

export interface QuizRecord {
  fileName: string;
  prompt: string;
  source: 'pdf';
  questions: TriviaQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
}

const questionSchema = new Schema<TriviaQuestion>(
  {
    id: { type: Number, required: true },
    question: { type: String, required: true },
    options: {
      A: { type: String, required: true },
      B: { type: String, required: true },
      C: { type: String, required: true },
      D: { type: String, required: true },
    },
    correctOption: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
    },
  },
  { _id: false },
);

const quizSchema = new Schema<QuizRecord>(
  {
    fileName: { type: String, required: true },
    prompt: { type: String, required: true },
    source: { type: String, required: true, default: 'pdf' },
    questions: { type: [questionSchema], required: true },
  },
  { timestamps: true },
);

export const QuizModel: Model<QuizRecord> =
  (models.Quiz as Model<QuizRecord>) ?? model<QuizRecord>('Quiz', quizSchema);
