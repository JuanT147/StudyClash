import { Router } from 'express';
import { UserModel } from '../models/User.js';
import { hashPassword, verifyPassword } from '../services/password.js';

export const authRouter = Router();

function sanitizeUser(user: {
  username: string;
  email: string;
  institution: string;
  bio: string;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  avatarId: string;
  isPremium: boolean;
  createdAt?: Date;
}) {
  return {
    username: user.username,
    email: user.email,
    institution: user.institution,
    bio: user.bio,
    level: user.level,
    xp: user.xp,
    maxXp: user.maxXp,
    coins: user.coins,
    avatarId: user.avatarId,
    isPremium: user.isPremium,
    createdAt: user.createdAt,
  };
}

authRouter.post('/register', async (req, res, next) => {
  try {
    const { username, email, institution, bio, password } = req.body ?? {};

    if (!username || !email || !password) {
      res.status(400).json({ error: 'username, email and password are required.' });
      return;
    }

    const normalizedUsername = String(username).trim();
    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await UserModel.findOne({
      $or: [
        { username: normalizedUsername },
        { email: normalizedEmail },
      ],
    }).lean();

    if (existingUser) {
      res.status(409).json({ error: 'Ya existe una cuenta con ese usuario o correo.' });
      return;
    }

    const passwordHash = await hashPassword(String(password));

    const user = await UserModel.create({
      username: normalizedUsername,
      email: normalizedEmail,
      institution: institution ? String(institution).trim() : 'Academia StudyClash',
      bio: bio ? String(bio).trim() : '¡Nuevo guerrero del conocimiento listo para ganar en StudyClash!',
      passwordHash,
      level: 1,
      xp: 0,
      maxXp: 1000,
      coins: 100,
      avatarId: 'cyber_scholar',
      isPremium: false,
    });

    res.status(201).json({ user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const { identifier, password } = req.body ?? {};

    if (!identifier || !password) {
      res.status(400).json({ error: 'identifier and password are required.' });
      return;
    }

    const normalizedIdentifier = String(identifier).trim();
    const normalizedEmail = normalizedIdentifier.toLowerCase();

    const user = await UserModel.findOne({
      $or: [
        { username: normalizedIdentifier },
        { email: normalizedEmail },
      ],
    });

    if (!user) {
      res.status(401).json({ error: 'La cuenta no existe. Debes registrarte primero.' });
      return;
    }

    const isValidPassword = await verifyPassword(String(password), user.passwordHash);

    if (!isValidPassword) {
      res.status(401).json({ error: 'Contraseña incorrecta.' });
      return;
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
});
