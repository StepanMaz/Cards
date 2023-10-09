import { Table } from "@shared/utils/table";
import { CardDeck } from "../../decks/cardDeck";
import { State, TempState } from "../states";

export class GameContext {
    public table: Table<[number, number]>
    //public state: State = new TempState(this);


    constructor(players: string[]) {

    }

    setBid() {

    }
}