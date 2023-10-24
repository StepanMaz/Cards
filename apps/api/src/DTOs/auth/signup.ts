import { IsEmail, IsString, Length } from "class-validator";

export class SignUpDTO {
    @IsString()
    @Length(4, 20)
    username: string;

    @IsEmail()
    email: string;

    @Length(6, 30)
    @IsString()
    password: string;
}
