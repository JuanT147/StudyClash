import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { Server as SocketIOServer } from 'socket.io';
import { app } from './app.js';
import { connectDatabase } from './db.js'; 
import { setupSocketIO } from './socket/handlers.js'; // Import the new handlers

dotenv.config({ path: '.env.local' });
dotenv.config();

const PORT = Number(process.env.PORT ?? 4001);
const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  try {
    await connectDatabase(MONGODB_URI ?? '');
    console.log('MongoDB connected.');
  } catch (error) {
    console.warn('MongoDB unavailable, starting with in-memory quiz storage.');
    console.warn(error);
  }

  const httpServer = createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  setupSocketIO(io); // Configura todos los manejadores de eventos de Socket.IO

  const server = httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`StudyClash API running on http://localhost:${PORT}`);
  });

  server.once('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.warn(
        `Port ${PORT} is already in use. StudyClash API may already be running on http://localhost:${PORT}.`,
      );
      process.exit(0);
      return;
    }

    throw error;
  });
}

main().catch((error) => {
  console.error('Failed to start StudyClash API:', error);
  process.exit(1);
});
