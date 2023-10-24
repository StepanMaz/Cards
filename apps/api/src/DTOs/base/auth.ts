import { IsString } from "class-validator";

export class Auth {
    @IsString()
    token: string;
}
