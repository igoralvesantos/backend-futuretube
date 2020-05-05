export class Video {
	constructor(
		private id: string,
		private url: string,
		private thumbnail: string,
		private title: string,
		private description: string,
		private creationTime: string,
		private userId: string
	) {}

	public getId(): string {
		return this.id;
	}

	public setId(id: string): void {
		this.id = id;
	}

	public getUrl(): string {
		return this.url;
	}

	public setUrl(url: string): void {
		this.url = url;
	}

	public getThumbnail(): string {
		return this.thumbnail;
	}

	public setThumbnail(thumbnail: string): void {
		this.thumbnail = thumbnail;
	}

	public getTitle(): string {
		return this.title;
	}

	public setTitle(title: string): void {
		this.title = title;
	}

	public getDescription(): string {
		return this.description;
	}

	public setDescription(description: string): void {
		this.description = description;
	}

	public getCreationTime(): string {
		return this.creationTime;
	}

	public setCreationTime(creationTime: string): void {
		this.creationTime = creationTime;
	}

	public getUserId(): string {
		return this.userId;
	}

	public setUserId(userId: string): void {
		this.userId = userId;
	}
}

export class VideoWithUser extends Video {
	constructor(
		id: string,
		url: string,
		thumbnail: string,
		title: string,
		description: string,
		creationTime: string,
		userId: string,
		private userName: string,
		private userPicture: string
	) {
		super(id, url, thumbnail, title, description, creationTime, userId);
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
}
