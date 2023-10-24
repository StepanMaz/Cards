import { Game } from "../game";
import { GameRepository } from "../repositories/game.repository";
import { Controller, Logger, Param, Post } from "@nestjs/common";

@Controller("game")
export class GameController {
    logger = new Logger(GameController.name);

    constructor(private readonly gameRepo: GameRepository) {}

    @Post(":id")
    public createGame(@Param() params: { id: string }) {
        if (!this.gameRepo.has(params.id)) {
            this.gameRepo.set(params.id, new Game());
            this.logger.log("New game created");
        }
    }
}
