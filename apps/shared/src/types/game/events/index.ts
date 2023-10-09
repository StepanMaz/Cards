import { Card, Suit } from "../../cards"

export type ServerEvents = {
    "add_player": { id: string },
    "set_hand": { id: string, count: number },
    "set_table": { id: string, card: Card<Suit, string | number> },
    "set_player_hand": { cards: Card<Suit, string | number>[] }
}

export type ClientEvents = {
    "set_bid": { bid: number },
    "place_card": { card: Card<Suit, string | number> }
}

export type ToSocketIOEvents<T extends Record<string, any>> = {
    [K in keyof T]: (arg: T[K]) => void;
}