import { mockUsers } from "@/data/mockData";
import { User } from "@/types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Mock auth — swap with real API calls when backend is ready
export async function loginUser(credentials: LoginCredentials): Promise<User> {
  await delay(700);
  const user = mockUsers.find((u) => u.email === credentials.email);
  if (!user) throw new Error("Invalid email or password");
  // In production: verify hashed password
  return user;
}

export async function registerUser(data: RegisterData): Promise<User> {
  await delay(700);
  const exists = mockUsers.find((u) => u.email === data.email);
  if (exists) throw new Error("Email already in use");
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: "user",
    createdAt: new Date().toISOString(),
    status: "active",
  };
  mockUsers.push(newUser);
  return newUser;
}

export async function fetchAllUsers(): Promise<User[]> {
  await delay(400);
  return mockUsers.filter((u) => u.role === "user");
}
