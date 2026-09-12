import userRepository from '../repositories/user.repository.js';
import hashPassword from '../utils/hashingPassword.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1d' });
};

class AuthService {
  async register({ name, email, password }) {
    const existingUser = await userRepository.existByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token
    };
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token
    };
  }
}

export default new AuthService();
