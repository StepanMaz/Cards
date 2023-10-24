import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway";
import { ServicesModule } from "../services/services.module";

@Module({
    imports: [ServicesModule],
    providers: [GameGateway],
})
export class GameGatewayModule {}
