export const DECK = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] as const;
export type Values = typeof DECK[number];