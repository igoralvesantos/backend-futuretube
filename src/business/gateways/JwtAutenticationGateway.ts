import { UserInfoForToken } from "../services/JWTAutentication";

export interface JWTAutenticationGateway {
  generateToken(input: UserInfoForToken, expiresIn: string): string
  verifyToken(token: string): UserInfoForToken
}
