import { randomUUID } from 'crypto';
import type { TriviaQuestion } from '../types.js';

export interface QuizSnapshot {
  id: string;
  fileName: string;
  prompt: string;
  source: 'pdf';
  questions: TriviaQuestion[];
  createdAt: string;
}

const inMemoryQuizzes: QuizSnapshot[] = [];

export function saveQuizSnapshot(input: Omit<QuizSnapshot, 'id' | 'createdAt'>) {
  const quiz: QuizSnapshot = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  inMemoryQuizzes.unshift(quiz);
  return quiz;
}

export function listQuizSnapshots() {
  return [...inMemoryQuizzes];
}

export function findQuizSnapshotById(id: string) {
  return inMemoryQuizzes.find((quiz) => quiz.id === id);
}
