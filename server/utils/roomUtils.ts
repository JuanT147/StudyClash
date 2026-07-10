export function generateRoomCode(): string {
  // Generate a 6-digit random number
  const min = 100000; // Smallest 6-digit number
  const max = 999999; // Largest 6-digit number
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}
