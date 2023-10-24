import { Module } from "@nestjs/common";
import { GameRepository } from "./game.repository";
import { LobbyRepository } from "./lobby.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UserRepository } from "./user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [GameRepository, LobbyRepository, UserRepository],
    exports: [GameRepository, LobbyRepository, UserRepository],
})
export class RepositoriesModule {}
