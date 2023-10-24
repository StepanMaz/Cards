import { Card, Suit } from "../../cards"

export type ServerEvents = {
    "add_player": { id: string },
    "remove_player": { id: string },
    "set_hand": { id: string, count: number },
    "set_table": { id: string, card: Card<Suit, string | number> },
    "set_player_hand": { cards: Card<Suit, string | number>[] },
    "alert": { data: any }
}

export type ClientEvents = {
    "set_bid": { bid: number },
    "connect_to_game": { game_id: string, player_id: string }
}

export type ToSocketIOEvents<T extends Record<string, any>> = {
    [K in keyof T]: (arg: T[K]) => void;
}

export type SocketData = {
    game_id: string
}