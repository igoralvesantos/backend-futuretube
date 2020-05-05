export class Reaction {
	constructor(
    private videoId: string,
		private userId: string,
		private type: TypeOfReaction,
	) {}

	public getVideoId(): string {
		return this.videoId;
	}

	public setVideoId(videoId: string): void {
		this.videoId = videoId;
	}

	public getUserId(): string {
		return this.userId;
	}

	public setUserId(userId: string): void {
		this.userId = userId;
	}

	public getType(): TypeOfReaction {
		return this.type;
	}

	public setType(type: TypeOfReaction): void {
		this.type = type;
	}
}

export enum TypeOfReaction {
  like = "like",
  dislike = "dislike"
}