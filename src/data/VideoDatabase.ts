import { BaseDatabase } from "./BaseDatabase";
import { Video, VideoWithUser } from "../business/entities/Video";
import { VideoGateway } from "../business/gateways/VideoGateway";

export class VideoDatabase extends BaseDatabase implements VideoGateway {
  private videoTableName = "FUTURETUBE_VIDEOS";

  private mapDBDataToVideo(input: any): Video {
    return new Video(
      input.id, 
      input.url, 
      input.thumbnail, 
      input.title, 
      input.description, 
      input.creationTime,
      input.userId
    )
  }

  private mapDBDataToVideoWithUser(input: any): VideoWithUser {
    return new VideoWithUser(
      input.id, 
      input.url, 
      input.thumbnail, 
      input.title, 
      input.description, 
      input.creationTime,
      input.userId,
      input.userName,
      input.userPicture
    )
  }

  public async uploadVideo(video: Video): Promise<void> {
    await this.connection.raw(`
      INSERT INTO ${this.videoTableName} (id, url, thumbnail, title, description, creationTime, userId) 
      VALUES(
        '${video.getId()}',
        '${video.getUrl()}',
        '${video.getThumbnail()}',
        '${video.getTitle()}',
        '${video.getDescription()}',
        '${video.getCreationTime()}',
        '${video.getUserId()}'
      );`
    )
  }

  public async getUserVideos(userId: string): Promise<Video[]> {
    const result = await this.connection.raw(`
      SELECT * 
      FROM ${this.videoTableName}
      WHERE userId = '${userId}'
      ORDER BY creationTime DESC;
    `)

    return result[0] && result[0].map((video: any) => {
      return this.mapDBDataToVideo(video)
    })
  }

  public async updateTitle(newTitle: string, videoId: string): Promise<void> {
    await this.connection.raw(`
      UPDATE ${this.videoTableName} 
      SET title = '${newTitle}'
      WHERE id = '${videoId}';
    `)
  }

  public async updateDescription(newDescription: string, videoId: string): Promise<void> {
    await this.connection.raw(`
      UPDATE ${this.videoTableName} 
      SET description = '${newDescription}'
      WHERE id = '${videoId}';
    `)
  }

  public async deleteVideo(videoId: string): Promise<void> {
    await this.connection.raw(`
      DELETE 
      FROM ${this.videoTableName} 
      WHERE id = '${videoId}';
    `)
  }

  public async getAllVideos(limit: number, offset: number): Promise<VideoWithUser[]> {
    const result = await this.connection.raw(`
      SELECT ${this.videoTableName}.*, FUTURETUBE_USERS.name userName, FUTURETUBE_USERS.picture userPicture
      FROM ${this.videoTableName} 
      JOIN FUTURETUBE_USERS ON FUTURETUBE_USERS.id = ${this.videoTableName}.userId
      LIMIT ${limit} OFFSET ${offset};
    `)

    return result[0] && result[0].map((video: any) => {
      return this.mapDBDataToVideoWithUser(video)
    })
  }

  public async getVideoDetails(videoId: string): Promise<VideoWithUser | undefined> {
    const result = await this.connection.raw(`
      SELECT ${this.videoTableName}.*, FUTURETUBE_USERS.name userName, FUTURETUBE_USERS.picture userPicture 
      FROM ${this.videoTableName}
      JOIN FUTURETUBE_USERS ON FUTURETUBE_USERS.id = ${this.videoTableName}.userId
      WHERE ${this.videoTableName}.id = '${videoId}';
    `)

    return result[0][0] && this.mapDBDataToVideoWithUser(result[0][0])
  }
}