import { Game } from "../game";
import { GameRepository } from "../repositories/game.repository";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";

type GameId = string;

@Injectable()
export class GameService {
    constructor(private readonly gameRepo: GameRepository) {}

    public create(config: GameCreationConfig): [GameId, Game] {
        const id = uuid() as string;
        const game = new Game();
        this.gameRepo.set(id, game);

        return [id, game];
    }

    public get(id: GameId) {
        return this.gameRepo.get(id);
    }

    public has(id: GameId) {
        return this.gameRepo.has(id);
    }
}

export interface GameCreationConfig {}
