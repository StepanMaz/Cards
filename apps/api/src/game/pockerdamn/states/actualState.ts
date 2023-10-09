import { RowActions } from "@shared/utils/table";
import { State } from ".";
import { Card } from "@shared/types/cards";
import { TrumpedCardDeck } from "#/game/decks/trumpedCardDeck";

export class ActualState<TSuit, TValue> extends State {
    players: Map<string, Card<TSuit, TValue>[]> = new Map();

    constructor(
        private readonly row: RowActions<[number, number]>,
        players: string[],
        public readonly deck: TrumpedCardDeck<TSuit, TValue>,
        private readonly cards_count: number) {
        super();

        for (const player of players) {
            this.players.set(player, deck.peek(cards_count));
        }
    }

    place(player_identifier: string, card: Card<TSuit, TValue>) {

        if (!this.playerHasCard(player_identifier, card)) throw new Error("Player does not have provided card");

        const cards = this.players.get(player_identifier);
        this.players.set(player_identifier, cards.filter(c => c.suit != card.suit && c.value != card.value));

        //todo validate suit
        //todo validate trump
        //todo validate some more shit
    }

    setActual(player_identifier: string, bid: number) {
        this.row.get(player_identifier)[1] = bid;

        // if (this.checkFinished()) throw new Error("Implement next state")
    }

    private playerHasCard(player_identifier: string, card: Card<TSuit, TValue>) {
        return true;
    }
}