import { BaseDatabase } from "./BaseDatabase";
import { Comment } from "../business/entities/Comment";
import { CommentGateway } from "../business/gateways/CommentGateway";


export class CommentDatabase extends BaseDatabase implements CommentGateway {
  private commentTableName = 'FUTURETUBE_COMMENTS';

  private mapDBDataToComment(input: any): Comment {
    return new Comment(
      input.id,
      input.message,
      input.time,
      input.userId,
      input.userName,
      input.userPicture,
      input.videoId
    )
  }
  
  public async createComment(comment: Comment): Promise<void> {
    await this.connection.raw(`
      INSERT INTO ${this.commentTableName} (id, message, time, userId, userName, userPicture, videoId)
      VALUES(
        '${comment.getId()}',
        '${comment.getMessage()}',
        '${comment.getTime()}',
        '${comment.getUserId()}',
        '${comment.getUserName()}',
        '${comment.getUserPicture()}',
        '${comment.getVideoId()}'
      )
    `)
  }

  public async getCommentsByVideo(videoId: string): Promise<Comment[]> {
    const result = await this.connection.raw(`
    SELECT * 
    FROM ${this.commentTableName}
    WHERE videoId = '${videoId}'
    ORDER BY time DESC;
  `)

  return result[0] && result[0].map((comment: any) => {
    return this.mapDBDataToComment(comment)
  })
  }
}