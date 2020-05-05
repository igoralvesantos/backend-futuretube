import { BaseDatabase } from "./BaseDatabase";
import { Reaction } from "../business/entities/Reaction";
import { ReactionGateway } from "../business/gateways/ReactionGateway";

export class ReactionDatabase extends BaseDatabase implements ReactionGateway {
  private reactionTableName = 'FUTURETUBE_REACTIONS';
  
  public async reactVideo(videoId: string, userId: string, type: string): Promise<void> {
    await this.connection.raw(`
      INSERT INTO ${this.reactionTableName} (videoId, userId, type)
      VALUES(
        '${videoId}',
        '${userId}',
        '${type}'
      )
    `)
  }

  public async removeReactVideo(videoId: string, userId: string): Promise<void> {
    await this.connection.raw(`
      DELETE 
      FROM ${this.reactionTableName} 
      WHERE videoId = '${videoId}' AND userId = '${userId}';
    `)
  }

  public async updateReactVideo(videoId: string, userId: string, react: string): Promise<void> {
    await this.connection.raw(`
      UPDATE ${this.reactionTableName}  
      SET type = '${react}' 
      WHERE userId = '${userId}' 
      and videoId = '${videoId}';
    `)
  }

  public async verifyReaction(videoId: string, userId: string): Promise<Reaction | undefined> {
    const result = await this.connection.raw(`
      SELECT * 
      FROM ${this.reactionTableName} 
      WHERE videoId = '${videoId}' AND userId = '${userId}';
    `)
    
    return result[0][0] && new Reaction(result[0][0].videoId, result[0][0].userId, result[0][0].type)
  }
}