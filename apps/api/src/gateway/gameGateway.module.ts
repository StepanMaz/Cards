import { Module } from "@nestjs/common";
import { GameGateway } from "./gameGateway";

@Module({
    providers: [GameGateway]
})
export class GameGatewayModule { }