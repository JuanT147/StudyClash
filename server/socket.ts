import type { Server } from 'socket.io';

let ioInstance: Server | null = null;

export function setSocketServer(io: Server) {
  ioInstance = io;
}

export function getSocketServer() {
  return ioInstance;
}

export function emitRoomState(roomCode: string, payload: unknown) {
  ioInstance?.to(roomCode).emit('room:state', payload);
}

export function emitRoomStarted(roomCode: string, payload: unknown) {
  ioInstance?.to(roomCode).emit('room:started', payload);
}
