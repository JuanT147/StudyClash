export type QuestionOptionKey = 'A' | 'B' | 'C' | 'D';

export interface TriviaQuestion {
  id: number;
  question: string;
  options: TriviaQuestionOptions; // Usar la interfaz específica para las opciones
  correctOption: QuestionOptionKey;
}

export interface TriviaQuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface RoomPlayer {
  username: string;
  email?: string;
  avatarId: string;
  isHost: boolean;
  isReady: boolean;
  socketId?: string;
}

export interface RoomRecord {
  roomCode: string;
  hostUsername: string;
  status: 'lobby' | 'live' | 'finished';
  fileName: string;
  prompt: string;
  questions: TriviaQuestion[];
  mode: string;
  timer: number;
  difficulty: string;
  players: RoomPlayer[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GenerateQuizRequestBody {
  fileName?: string;
  pdfBase64: string;
  prompt?: string;
}

export interface CreateRoomRequestBody {
  hostUsername: string;
  hostEmail?: string;
  hostAvatarId: string;
  questions: TriviaQuestion[];
  mode?: string;
  timer?: number;
  difficulty?: string;
  fileName?: string;
  prompt?: string;
}

export interface JoinRoomRequestBody {
  player: RoomPlayer; // Usar la nueva interfaz RoomPlayer
}
