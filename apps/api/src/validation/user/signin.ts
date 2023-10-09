import { IsEmail, IsString, Length } from "class-validator"

export class SignInDTO {
    @IsEmail()
    email: string

    @Length(4, 30)
    @IsString()
    username: string

    @Length(6, 30)
    @IsString()
    password: string
}