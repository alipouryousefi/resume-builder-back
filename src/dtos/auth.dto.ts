import { IUser } from '../types/models';

// Registration DTOs
export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
}

export interface RegisterUserResponseDto {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

// Login DTOs
export interface LoginUserDto {
  email: string;
  password: string;
}

export interface LoginUserResponseDto {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    profileImageUrl?: string;
  };
  token: string;
}

// User Profile DTOs
export interface UserProfileResponseDto {
  message: string;
  user: Omit<IUser, 'password'>;
} 