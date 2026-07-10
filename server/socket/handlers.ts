import { Server as SocketIOServer, Socket } from 'socket.io';
import { RoomModel } from '../models/Room.js'; // RoomPlayer y RoomRecord se importan de types
import { RoomPlayer, RoomRecord, TriviaQuestion, GameMode, Difficulty } from '../types.js'; // Importar RoomPlayer y RoomRecord desde types

// Extend Socket to include custom data
interface CustomSocket extends Socket {
  data: {
    roomCode?: string;
    username?: string;
  };
}

interface JoinRoomPayload {
  roomCode: string;
  username: string;
  avatarId: string;
  email?: string;
}

interface StartGamePayload {
  roomCode: string;
}

// Helper function to emit room state
function emitRoomState(io: SocketIOServer, room: RoomRecord) {
  io.to(room.roomCode).emit('room:state', {
    roomCode: room.roomCode,
    status: room.status,
    players: room.players as RoomPlayer[],
    questions: room.questions,
    fileName: room.fileName,
    prompt: room.prompt,
    mode: room.mode,
    timer: room.timer,
    difficulty: room.difficulty,
    hostUsername: room.hostUsername,
  });
}

export function setupSocketIO(io: SocketIOServer) {
  io.on('connection', (socket: CustomSocket) => {
    const socketInstance = socket; // Capture socket for use in handlers
    console.log(`[Socket.IO] Cliente conectado: ${socket.id}`);

    socket.on('room:join', async (payload: JoinRoomPayload) => {
        const { roomCode, username, avatarId, email } = payload;
      console.log(`[Socket.IO] ${username} (${socket.id}) intentando unirse a la sala: ${roomCode}`);

      if (!roomCode || !username) {
        socket.emit('roomError', { message: 'Faltan datos esenciales para unirse a la sala.' });
        return;
      }

      try {
        const room = await RoomModel.findOne({ roomCode });

        if (!room) {
          console.warn(`[Socket.IO] Sala ${roomCode} no encontrada para ${username}.`);
          socket.emit('roomError', { message: 'Sala no encontrada.' });
          return;
        }

        socketInstance.join(roomCode);
        socketInstance.data.roomCode = roomCode;
        socketInstance.data.username = username;

        const nextPlayer: RoomPlayer = {
          username,
          email,
          avatarId,
          isHost: room.hostUsername === username, // Server determines host
          isReady: room.hostUsername === username, // Host is ready by default
          socketId: socket.id,
        };

        const existingPlayerIndex = room.players.findIndex(
          (p) => p.username.toLowerCase() === username.toLowerCase()
        );

        if (existingPlayerIndex >= 0) {
          // Update existing player (e.g., for reconnection or socketId change)
          room.players[existingPlayerIndex] = {
            ...room.players[existingPlayerIndex],
            ...nextPlayer,
          };
        } else {
          // Add new player
          room.players.push(nextPlayer);
        }

        await room.save();
        console.log(`[Socket.IO] ${username} (${socket.id}) se unió a la sala: ${roomCode}`);

        // Emit updated room state to all clients in the room using helper
        emitRoomState(io, room.toObject());
      } catch (error) {
        console.error(`[Socket.IO] Error al unirse a la sala ${roomCode}:`, error);
        socket.emit('roomError', { message: 'Error interno del servidor al unirse a la sala.' });
      }
    });

    socket.on('room:start', async (payload: StartGamePayload) => {
      const roomCode = payload?.roomCode ?? socket.data.roomCode;
      if (!roomCode) {
        socket.emit('roomError', { message: 'Código de sala no proporcionado.' });
        return;
      }

      try {
        const room = await RoomModel.findOne({ roomCode });
        if (!room) {
          socket.emit('roomError', { message: 'Sala no encontrada para iniciar el juego.' });
          return;
        }

        // TODO: Implement checks for host and all players ready
        // if (socket.data.username !== room.hostUsername) {
        //   socket.emit('roomError', { message: 'Solo el anfitrión puede iniciar el juego.' });
        //   return;
        // }
        // if (room.players.some(p => !p.isReady)) {
        //   socket.emit('roomError', { message: 'No todos los jugadores están listos.' });
        //   return;
        // }

        room.status = 'live'; // Change room status to 'live'
        await room.save();

        io.to(roomCode).emit('room:started', {
          roomCode: room.roomCode,
          status: room.status,
          questions: room.questions,
        });
        // Also send a general state update
        emitRoomState(io, room.toObject());
        console.log(`[Socket.IO] Sala ${roomCode} iniciada por ${socket.data.username}.`);
      } catch (error) {
        console.error(`[Socket.IO] Error al iniciar la sala ${roomCode}:`, error);
        socket.emit('roomError', { message: 'Error interno del servidor al iniciar la sala.' });
      }
    });

    socket.on('disconnect', async () => {
      console.log(`[Socket.IO] Cliente desconectado: ${socket.id}`);
      const roomCode = socket.data.roomCode;
      const username = socket.data.username;

      if (!roomCode || !username) {
        console.log(`[Socket.IO] Desconexión de socket sin roomCode o username en data: ${socket.id}`);
        return;
      }

      try {
        const room = await RoomModel.findOne({ roomCode });
        if (!room) {
          console.warn(`[Socket.IO] Sala ${roomCode} no encontrada al desconectar ${username}.`);
          return;
        }

        room.players = room.players.filter(
          (player) => player.username.toLowerCase() !== username.toLowerCase()
        );

        // Handle host disconnection: assign new host or delete room if no players left
        if (room.hostUsername.toLowerCase() === username.toLowerCase()) {
          console.log(`[Socket.IO] Anfitrión ${username} se desconectó de la sala ${roomCode}.`);
          if (room.players.length > 0) {
            room.players[0].isHost = true;
            room.hostUsername = room.players[0].username;
            console.log(`[Socket.IO] Nuevo anfitrión para ${roomCode}: ${room.players[0].username}`);
          } else {
            await RoomModel.deleteOne({ roomCode });
            console.log(`[Socket.IO] Sala ${roomCode} eliminada por falta de jugadores.`);
            return;
          }
        }

        await room.save();

        emitRoomState(io, room.toObject());
        console.log(`[Socket.IO] ${username} (${socket.id}) desconectado de la sala: ${roomCode}`);
      } catch (error) {
        console.error(`[Socket.IO] Error al manejar la desconexión de ${username} de la sala ${roomCode}:`, error);
      }
    });

    // Aquí irán más eventos como 'playerReady', 'submitAnswer', etc.
  });
}
