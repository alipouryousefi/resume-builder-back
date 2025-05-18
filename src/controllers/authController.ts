import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';
import { NextFunction, Request, Response } from 'express';
import {
  RegisterUserDto,
  RegisterUserResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
  UserProfileResponseDto,
} from '../dtos/auth.dto';

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '7d' });
};

const registerUser = async (
  req: Request<{}, {}, RegisterUserDto>,
  res: Response<RegisterUserResponseDto>,
  next: NextFunction,
) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' } as any);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    const response: RegisterUserResponseDto = {
      message: 'User created successfully',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id.toString()),
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (
  req: Request<{}, {}, LoginUserDto>,
  res: Response<LoginUserResponseDto>,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid email or password' } as any);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: 'Invalid email or password' } as any);
    }

    const response: LoginUserResponseDto = {
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      },
      token: generateToken(user._id.toString()),
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (
  req: Request,
  res: Response<UserProfileResponseDto>,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' } as any);
    }

    const response: UserProfileResponseDto = {
      message: 'User profile fetched successfully',
      user,
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export { registerUser, loginUser, getUserProfile };
