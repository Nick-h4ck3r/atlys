export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: string;
  content: string;
  emoji: string;
  author: User;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface AuthFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends AuthFormData {
  repeatPassword: string;
}

export type AuthMode = "signin" | "signup";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
