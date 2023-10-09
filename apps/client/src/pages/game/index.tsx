import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { reducer as gameReducer, setPlayerHand, swapHand } from "../../redux/game/slices/gameSlice";
import { GameConnection, GetFromObj } from "../../services/gameConnection";
import { io } from "socket.io-client";
import { Suit, Card as CardType } from "@shared/types/cards"
import Card from "../../components/card";
import "./styles.css"
import { useEffect, useMemo, useRef } from "react";
/*
const gameConnection = new GameConnection(io('/game'));

const middleware = gameConnection.createMiddleware<GetFromObj<typeof import("../../redux/game/slices/gameSlice")>>({
    on: {
        "add_player": "game/addPlayer",
        "set_player_hand": "game/setPlayerHand",
        "set_table": "game/setTable",
        "set_hand": "game/setHand"
    },
    emit: {

    }
});*/

const store = configureStore({
    reducer: gameReducer,
    /*middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(middleware);
    }*/
});

store.dispatch(setPlayerHand({ cards: [{ suit: "Clubs", value: 7 }, { suit: "Clubs", value: 8 }, { suit: "Clubs", value: 9 }, { suit: "Clubs", value: 10 }, { suit: "Clubs", value: "J" }] }))

export default function GamePage() {
    return <Provider store={store}>
        <ShowTable />
        <ShowHand />
    </Provider>
}

function ShowHand() {
    const hand = useSelector<any, CardType<Suit, string | number>[]>(selector => selector.hand);


    return <div className="cards-hand">
        {hand.map((card, index) =>
            <Card
                className="focusable"
                key={index}
                draggable
                suit={card.suit}
                value={card.value}
            />
        )}
    </div>
}

function ShowTable() {
    const hand = useSelector<any, CardType<Suit, string | number>[]>(selector => selector.hand)
    return <div style={{ width: "200px", height: "200px", backgroundColor: "black" }} onDrop={e => console.log("drop")} onDragOver={e => e.preventDefault()}>

    </div>
}