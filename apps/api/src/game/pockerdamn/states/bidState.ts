import { RowActions } from "@shared/utils/table";
import { ActualState, State } from ".";

export class BidState extends State {
    constructor(private readonly row: RowActions<[number, number]>, private readonly setNext: () => void) {
        super();
    }

    setBid(player_identifier: string, bid: number) {
        this.row.get(player_identifier)[0] = bid;

        if (this.checkFinished()) this.setNext();
    }

    private checkFinished() {
        return this.row.read().every(t => t[0] != -1);
    }
}

//TODO: queue check
//TODO: two 0 limit
//TODO: events