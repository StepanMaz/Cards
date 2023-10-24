import { State } from ".";
import { GameCore } from "../gameCore";

export class BidState<TPlayer> extends State<TPlayer> {
    constructor(
        gameCore: GameCore<TPlayer>,
        private readonly config: BidStateConfig,
    ) {
        super(gameCore);
    }

    public setBid(player: TPlayer, bid: number) {
        this.gameCore.currentRound.players.get(player).bid = bid;

        if (this.checkFinished()) {
            this.gameCore.setStateActive();
        }
    }

    private checkFinished() {
        return Array.from(this.gameCore.currentRound.players.values()).every(
            (t) => Boolean(t.bid),
        );
    }
}

export interface BidStateConfig {}
