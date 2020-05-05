import { Video, VideoWithUser } from "../entities/Video";

export interface VideoGateway {
  uploadVideo(video: Video): Promise<void>
  getUserVideos(userId: string): Promise<Video[]>
  updateTitle(newTitle: string, videoId: string): Promise<void>
  updateDescription(newDescription: string, videoId: string): Promise<void>
  deleteVideo(videoId: string): Promise<void>
  getAllVideos(limit: number, offset: number): Promise<VideoWithUser[]>
  getVideoDetails(videoId: string): Promise<VideoWithUser | undefined>
}