import Game from "#/game/pockerdamn";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameRepo {
    games = new Map<string, Game>();
    public set(game: Game): string {
        const id = uuidv4() as string;
        this.games.set(id, game);
        return id;
    }

    public get(id: string) {
        return this.games.get(id);
    }

    public delete(id: string) {
        return this.games.delete(id);
    }
}