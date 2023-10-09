/*import { RowActions, Table } from "@shared/utils/table";
import { CardDeckBuilder } from ".";
import { ActualState, BidState, State, TempState } from "./states";

interface _temp_PlayerManager {
    getIdentifiers(): string[]
}

const TABLE_DEFAULT_VALUE = -1;

export default class Game {
    private table: Table<[number, number]>;
    private _state: State;

    get state() {
        return this._state;
    }

    constructor(private playerManger: _temp_PlayerManager) {
        this.table = new Table(playerManger.getIdentifiers(), [TABLE_DEFAULT_VALUE, TABLE_DEFAULT_VALUE]);
        this._state = new TempState(this);
    }

    getPlayerPoint(player_identifier: string) {
        return this.table.readColumn(player_identifier).reduce((sum, el) => sum += Game.eval(...el), 0);
    }

    setBidState() {
        this._state = new BidState(this, this.table.row(-1));
    }

    setActualState() {
        //this._state = new ActualState(this, this.table.row(-1), this.deck, 10 /*TOCHANGE);
    }

setTempState() {
    this._state = new TempState(this);
}

    static eval(bid: number, actual: number) {
    if (bid == TABLE_DEFAULT_VALUE || actual == TABLE_DEFAULT_VALUE) return 0;
    if (bid == 0 && actual == 0) return 5;
    if (bid == actual) return bid * 10;
    if (bid > actual) return bid;
    return (bid - actual) * 10;
}
}
*/

export default class Game {

}