import { SignInDTO, SignUpDTO, RefreshDTO } from "../DTOs/auth";
import {
    Controller,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
    Body,
} from "@nestjs/common";
import { AuthService } from "../services/auth";

@Controller("auth")
@UsePipes(new ValidationPipe())
export default class AuthController {
    constructor(private readonly auth_service: AuthService) {}

    @Put()
    public signIn(@Body() data: SignInDTO) {
        return this.auth_service.singIn(data);
    }

    @Post()
    public async signUp(@Body() data: SignUpDTO) {
        return this.auth_service.singUp(data);
    }

    @Post("refresh")
    public async refresh(@Body() data: RefreshDTO) {
        return this.auth_service.refreshAccessToken(data.token);
    }
}
