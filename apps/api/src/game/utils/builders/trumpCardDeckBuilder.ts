import { Card } from "shared/src//types/cards";
import { TrumpedCardDeck } from "../decks/trumpedCardDeck";

export class TrumpCardDeckBuilder<TSuit, TValue> {
    private policy;

    constructor(private card_stack: Card<TSuit, TValue>[]) {
        this.policy = TrumpCardDeckBuilder.policies.last;
    }

    setTrumpCardPolicy(value: typeof TrumpCardDeckBuilder.policies.last) {
        this.policy = value;
        return this;
    }

    build() {
        const trump_card = this.policy(this.card_stack);
        if (!trump_card) throw new Error();
        return new TrumpedCardDeck(this.card_stack, trump_card);
    }

    static policies = {
        last: <TSuit, TValue>(stack: readonly Card<TSuit, TValue>[]) =>
            stack.at(-1),
        const:
            <TSuit, TValue>(trump_card: Card<TSuit, TValue | undefined>) =>
            (stack: readonly Card<TSuit, TValue>[]) =>
                trump_card,
    } as const;
}
