export const SUITS = ["Clubs", "Spades", "Hearts", "Diamonds"] as const;
export type Suit = typeof SUITS[number];