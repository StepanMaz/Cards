import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { RepositoriesModule } from "../repositories/repositories.module";
import { LobbyService } from "./lobby.service";
import { AuthService, JwtAuthGuard, JwtStrategy } from "./auth";
import { TokenModule } from "./token/token.module";
import { RedisModule } from "./redis.module";

@Module({
    imports: [RepositoriesModule, TokenModule],
    providers: [
        GameService,
        LobbyService,
        AuthService,
        JwtAuthGuard,
        JwtStrategy,
    ],
    exports: [
        GameService,
        LobbyService,
        AuthService,
        JwtAuthGuard,
        JwtStrategy,
    ],
})
export class ServicesModule {}
