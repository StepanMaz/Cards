import { Module } from "@nestjs/common";
import AuthController from "./auth.controller";
import { GameController } from "./game.constroller";
import { ServicesModule } from "../services/services.module";
import { RepositoriesModule } from "../repositories/repositories.module";
import { LobbyController } from "./lobby.controller";

@Module({
    imports: [ServicesModule, RepositoriesModule],
    controllers: [AuthController, GameController, LobbyController],
})
export class ControllersModule {}
