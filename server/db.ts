import mongoose from 'mongoose';

export async function connectDatabase(connectionString: string) {
  if (!connectionString) {
    throw new Error('MONGODB_URI is required.');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  return mongoose.connect(connectionString, {
    dbName: process.env.MONGODB_DB_NAME ?? 'StudyClash',
  });
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
