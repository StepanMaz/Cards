import { IsEmail, IsString, Length } from "class-validator"

export class SignUpDTO {
    @IsEmail()
    email: string

    @Length(6, 30)
    @IsString()
    password: string
}