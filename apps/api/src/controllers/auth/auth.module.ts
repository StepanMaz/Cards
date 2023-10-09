import { Module } from "@nestjs/common";
import AuthController from "./auth.controller";

console.log(123);

@Module({
    controllers: [AuthController],
})
export class AuthModule { }