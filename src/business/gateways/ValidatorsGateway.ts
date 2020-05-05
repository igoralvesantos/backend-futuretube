export interface ValidatorsGateway {
  validateSignupInput(input: any): void
  validateLoginInput(input: any): void
  validateChangePasswordInput(input: any): void
  validateUploadVideoInput(input: any): void
  validateGetUserVideoInput(input: any): void 
  validateUpdateVideoInput(input: any): void
  validateDeleteVideoInput(input: any): void
  validateGetAllVideosInput(input: any): void 
  validateGetVideoDetailsInput(input: any): void
  validateReactVideoInput(input: any): void
  validateGetUserReactionInput(input: any): void 
  validateCreateCommentInput(input: any): void
  validateGetCommentByVideoInput(input: any): void
}