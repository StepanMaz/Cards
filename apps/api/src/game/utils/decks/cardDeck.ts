import { Card } from "shared/src/types/cards";

export class CardDeck<TSuit, TValue> {
    get count() {
        return this.card_stack.length;
    }

    constructor(protected card_stack: Card<TSuit, TValue>[]) {}

    /**
     * Takes cards from deck. Can return <b>less</b> then `amount` if card deck has less cards
     * @param amount amount of cards to peek
     */
    peek(amount = 1) {
        if (amount < 0) throw new Error("Peek amount can't be less then 0");
        return this.card_stack.splice(0, amount);
    }
}
