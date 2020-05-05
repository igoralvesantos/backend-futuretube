import { ValidatorsGateway } from '../gateways/ValidatorsGateway';
import { BadRequestError } from '../errors/BadRequestError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import UrlPattern from 'url-pattern';
import { TypeOfReaction } from '../entities/Reaction';

export class Validators implements ValidatorsGateway {
	private isEmpty(input: string): boolean {
		return input !== undefined && input !== null && input !== '';
	}

	private isUrl(input: string): boolean {
		const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(*)');
		if (pattern.match(input) === null) {
			return false;
		}
		return true;
	}

	public validateSignupInput(input: any): void {
		if (
			!this.isEmpty(input.name) ||
			!this.isEmpty(input.email) ||
			!this.isEmpty(input.password) ||
			!this.isEmpty(input.birthDate) ||
			!this.isEmpty(input.picture)
		) {
			throw new BadRequestError('Missing Input');
    } 
    
    if (input.email.indexOf('@') === -1) {
			throw new BadRequestError('Invalid email request');
    }
    
    if(!this.isUrl(input.picture)){
      throw new BadRequestError('Invalid url picture');
    }
	}

	public validateLoginInput(input: any): void {
		if (!this.isEmpty(input.email) || !this.isEmpty(input.password)) {
			throw new BadRequestError('Missing Input');
    } 
    
    if (input.email.indexOf('@') === -1) {
			throw new BadRequestError('Invalid email request');
		}
	}

	public validateChangePasswordInput(input: any): void {
		if (!this.isEmpty(input.oldPassword) || !this.isEmpty(input.newPassword) || !this.isEmpty(input.token)) {
			throw new BadRequestError('Missing Input');
    } 
	}

	public validateUploadVideoInput(input: any): void {
		if (
			!this.isEmpty(input.url) ||
			!this.isEmpty(input.thumbnail) ||
			!this.isEmpty(input.title) ||
			!this.isEmpty(input.description) ||
			!this.isEmpty(input.token)
		) {
			throw new BadRequestError('Missing Input');
		} 
		
		if(!this.isUrl(input.url)){
      throw new BadRequestError('Invalid video url');
		}
		
		if(!this.isUrl(input.thumbnail)){
      throw new BadRequestError('Invalid thumbnail url');
    }
	}

	public validateGetUserVideoInput(input: any): void {
		if (!this.isEmpty(input.id) && !this.isEmpty(input.token)) {
			throw new BadRequestError('Missing Input');
		}
	}

	public validateUpdateVideoInput(input: any): void {
		if (
      (!this.isEmpty(input.title) && 
      !this.isEmpty(input.description)) || 
      !this.isEmpty(input.videoId)
    ) {
			throw new BadRequestError('Missing Input');
    } 
    
    if (!this.isEmpty(input.token)) {
			throw new UnauthorizedError('Unauthorized');
		}
	}

	public validateDeleteVideoInput(input: any): void {
		if (!this.isEmpty(input.videoId) || !this.isEmpty(input.token)) {
			throw new BadRequestError('Missing Input');
    } 
	}

	public validateGetAllVideosInput(input: any): void {  
    if (!this.isEmpty(input.page) || !this.isEmpty(input.token)) {
			throw new BadRequestError('Missing Input');
		}
	}

	public validateGetVideoDetailsInput(input: any): void {   
    if (!this.isEmpty(input.videoId) || !this.isEmpty(input.token)) {
			throw new BadRequestError('Missing Input');
		}
	}

	public validateReactVideoInput(input: any): void {
		if (!this.isEmpty(input.videoId) && !this.isEmpty(input.token) && !this.isEmpty(input.reaction)) {
			throw new BadRequestError('Missing Input');
		}

		if (!this.isEmpty(input.token)) {
			throw new BadRequestError('Missing Input');
		} 
		
		if (input.reaction.toLowerCase() !== TypeOfReaction.like && input.reaction !== TypeOfReaction.dislike) {
			throw new BadRequestError('Wrong reaction type');
    } 
	}

	public validateGetUserReactionInput(input: any): void {
    if (!this.isEmpty(input.videoId) || !this.isEmpty(input.token)) {
			throw new BadRequestError('Missing Input');
		}
	}

	public validateCreateCommentInput(input: any): void {    
    if (!this.isEmpty(input.videoId) || !this.isEmpty(input.message) || !this.isEmpty(input.token)) {
			throw new BadRequestError('Missing Input');
		}
	}

	public validateGetCommentByVideoInput(input: any): void {   
    if (!this.isEmpty(input.videoId) || !this.isEmpty(input.token)) {
			throw new BadRequestError('Missing Input');
		}
	}
}