export class User {
	constructor(
		private id: string,
		private name: string,
		private email: string,
		private password: string,
		private birthDate: string,
		private picture: string
	) {}

	public getId(): string {
		return this.id;
	}

	public setId(id: string): void {
		this.id = id;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string): void {
		this.name = name;
	}

	public getEmail(): string {
		return this.email;
	}

	public setEmail(email: string): void {
		this.email = email;
	}

	public getPassword(): string {
		return this.password;
	}

	public setPassword(password: string): void {
		this.password = password;
	}

	public getBirthDate(): string {
		return this.birthDate;
	}

	public setBirthDate(birthDate: string): void {
		this.birthDate = birthDate;
	}

	public getPicture(): string {
		return this.picture;
	}

	public setPicture(picture: string): void {
		this.picture = picture;
	}
}
