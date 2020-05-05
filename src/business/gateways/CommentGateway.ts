import { Comment } from "../entities/Comment";

export interface CommentGateway {
  createComment(comment: Comment): Promise<void> 
  getCommentsByVideo(videoId: string): Promise<Comment[]>
}