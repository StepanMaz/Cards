import { IsString } from "class-validator";

export class SignInDTO {
    @IsString()
    identifier: string;

    @IsString()
    password: string;
}
