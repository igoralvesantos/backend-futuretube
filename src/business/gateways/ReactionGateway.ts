import { Reaction } from "../entities/Reaction";

export interface ReactionGateway {
  reactVideo(videoId: string, userId: string, react: string): Promise<void>
  removeReactVideo(videoId: string, userId: string): Promise<void> 
  updateReactVideo(videoId: string, userId: string, react: string): Promise<void>
  verifyReaction(videoId: string, userId: string): Promise<Reaction | undefined>
}