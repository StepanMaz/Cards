export const DECK = [6, 7, 8, 9, 10, "J", "Q", "K", "A"] as const;
export type Values = typeof DECK[number];