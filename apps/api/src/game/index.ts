import { GameCore } from "./gameCore";

export class Game<TPlayer = any> {
    private core: GameCore<TPlayer>;

    get state() {
        return this.core.state;
    }

    constructor() {
        this.core = new GameCore();
    }

    public temp_AddPlayer(player: TPlayer) {
        this.core.temp_addPlayer(player);
    }
}
