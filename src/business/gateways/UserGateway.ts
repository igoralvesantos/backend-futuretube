import { User } from "../entities/User"

export interface UserGateway {
  createUser(user: User): Promise<void>
  getUserByEmail(email: string): Promise<User | undefined>
  getUserById(id: string): Promise<User | undefined>
  updatePassword(newPassword: string, userId: string): Promise<void>
}