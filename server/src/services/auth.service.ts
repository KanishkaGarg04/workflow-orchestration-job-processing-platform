import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";

class AuthService {
  async register(
    name: string,
    email: string,
    password: string
  ) {
    const existingUser =
      await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already registered.");
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken =
      generateAccessToken(user.id, user.role);

    const refreshToken =
      generateRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }
  async login(email: string, password: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id, user.role);

  const refreshToken = generateRefreshToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}
async profile(userId: string) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
}

export default new AuthService();