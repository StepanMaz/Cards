import {
    SUITS,
    DECK36,
    DECK52,
    type Suit,
    type Values36,
    type Values52,
    type Card,
} from "shared/src/types/cards";
import { CardDeck } from "../decks/cardDeck";

export class CardDeckBuilder<TSuit, TValue> {
    public static readonly Deck36 = new CardDeckBuilder<Suit, Values36>(
        SUITS,
        DECK36,
    );
    public static readonly Deck52 = new CardDeckBuilder<Suit, Values52>(
        SUITS,
        DECK52,
    );
    private _shuffle: boolean = true;

    constructor(
        private suits: readonly TSuit[],
        private values: readonly TValue[],
        private additionals?: Card<TSuit, TValue>[],
    ) {}

    shuffle(shuffle: boolean) {
        this._shuffle = shuffle;
        return this;
    }

    build<T>(target: new (card_stack: Card<TSuit, TValue>[]) => T): T;
    build(): CardDeck<TSuit, TValue>;
    build(target?: any) {
        target = target ?? CardDeck<TSuit, TValue>;
        const card_stack = this.suits
            .map((suit) => this.values.map((value) => ({ suit, value })))
            .flat()
            .concat(this.additionals ?? []);
        if (this._shuffle) {
            card_stack.sort(() => (Math.random() > 0.5 ? 1 : -1));
        }
        return new target(card_stack);
    }
}
