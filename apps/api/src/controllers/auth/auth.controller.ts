import { SignInDTO, SignUpDTO } from "#/validation/user";
import { Controller, Post, Put, UsePipes, ValidationPipe, Body } from "@nestjs/common";

@Controller('auth')
@UsePipes(new ValidationPipe())
export default class AuthController {

    @Put()
    public signIn(@Body() data: SignInDTO) {
        console.log(data);
    }

    @Post()
    public async signUp(@Body() data: SignUpDTO) {
        console.log(data);
    }
}