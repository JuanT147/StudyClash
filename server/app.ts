import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { authRouter } from './routes/auth';
import { roomsRouter } from './routes/rooms';
import { quizzesRouter } from './routes/quizzes';

export const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'StudyClash API' });
});

app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/quizzes', quizzesRouter);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  const message = error instanceof Error ? error.message : 'Unexpected server error.';
  res.status(500).json({ error: message });
});
