import { Card } from "@shared/types/cards";
import { CardDeck } from "./cardDeck";

export class TrumpedCardDeck<TSuit, TValue> extends CardDeck<TSuit, TValue> {
    constructor(card_stack: Card<TSuit, TValue>[], public readonly trump_card: Card<TSuit, TValue>) {
        super(card_stack);
    }

    isTrump(card: Card<TSuit, TValue>) {
        return this.trump_card.suit === card.suit;
    }
}