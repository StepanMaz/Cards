import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, Suit } from "@shared/types/cards";

type GameState = {
    game_id?: string,
    players: string[],
    players_hands: Record<string, number>,
    table: Record<string, Card<Suit, string | number>>
    hand: Card<Suit, string | number>[]
}

const initialState: GameState = {
    players: [],
    players_hands: {},
    table: {},
    hand: []
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        addPlayer(state, action: PayloadAction<{ id: string }>) {
            state.players.push(action.payload.id);
        },
        setHand(state, action: PayloadAction<{ id: string, count: number }>) {
            const { id, count } = action.payload;
            state.players_hands[id] = count;
        },
        setTable(state, action: PayloadAction<{ id: string, card: Card<Suit, string | number> }>) {
            const { id, card } = action.payload;
            state.table[id] = card;
        },
        setPlayerHand(state, action: PayloadAction<{ cards: Card<Suit, string | number>[] }>) {
            state.hand = action.payload.cards;
        },
        removeFromHand(state, action: PayloadAction<{ card: Card<Suit, string | number> }>) {
            state.hand = state.hand.filter(card => !(card.suit == action.payload.card.suit && card.value == action.payload.card.value));
        },
        addToHand(state, action: PayloadAction<{ card: Card<Suit, string | number> }>) {
            state.hand = state.hand.concat(action.payload.card);
        },
        swapHand(state, action: PayloadAction<{ from: number, to: number }>) {
            const { from, to } = action.payload;
            const element = state.hand[from];
            if (from > to) {
                state.hand = state.hand.slice(0, to).concat(element).concat(...state.hand.slice(to, from)).concat(...state.hand.slice(from + 1));
            }
            /*else if (to > from) {
                state.hand = state.hand.slice(0, from).concat(...state.hand.slice(from + 1, to), element, ...state.hand.slice(to));
            }*/
            console.log("aaa")
        }
    }
})


export const { setHand, setPlayerHand, addPlayer, setTable, removeFromHand, addToHand, swapHand } = gameSlice.actions;
export const reducer = gameSlice.reducer;