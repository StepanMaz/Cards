import { GameCore } from "../gameCore";
import { BidState } from ".";

export class State<TPlayer> {
    constructor(protected readonly gameCore: GameCore<TPlayer>) {}

    isBidState(): this is BidState<TPlayer> {
        return this instanceof BidState;
    }
}
