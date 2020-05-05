export class Comment {
	constructor(
		private id: string,
    private message: string,
    private time: string,
		private userId: string,
		private userName: string,
		private userPicture: string,
		private videoId: string
	) {}

	public getId(): string {
		return this.id;
	}

	public setId(id: string): void {
		this.id = id;
	}

	public getMessage(): string {
		return this.message;
	}

	public setMessage(message: string): void {
		this.message = message;
  }
  
  public getTime(): string {
		return this.time;
	}

	public setTime(time: string): void {
		this.time = time;
	}

	public getUserId(): string {
		return this.userId;
	}

	public setUserId(userId: string): void {
		this.userId = userId;
	}

	public getUserName(): string {
		return this.userName;
	}

	public setUserName(userName: string): void {
		this.userName = userName;
	}

	public getUserPicture(): string {
		return this.userPicture;
	}

	public setUserPicture(userPicture: string): void {
		this.userPicture = userPicture;
	}

	public getVideoId(): string {
		return this.videoId;
	}

	public setVideoId(videoId: string): void {
		this.videoId = videoId;
	}
}