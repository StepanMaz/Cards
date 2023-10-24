import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { GameState, reducer as gameReducer, } from "../../redux/game/slices/gameSlice";
import { GameConnection, GetFromObj } from "../../services/gameConnection";
import { io } from "socket.io-client";
import { Suit, Card as CardType } from "@shared/types/cards"
import Card from "../../components/card";
import "./styles.css"
import { useEffect, useMemo, useRef, useState } from "react";

const useAppSelector = useSelector as unknown as <T>(selector: (store: GameState) => T) => T;

const socket = io('/game', { autoConnect: false });
socket.on("alert", (d) => alert(JSON.stringify(d)))
const gameConnection = new GameConnection(socket);

const middleware = gameConnection.createMiddleware<GetFromObj<typeof import("../../redux/game/slices/gameSlice")['actions']>>({
    on: {
        "add_player": "game/addPlayer",
        "remove_player": "game/removePlayer",
        "set_player_hand": "game/setPlayerHand",
        "set_table": "game/setTable",
        "set_hand": "game/setHand"
    },
    emit: {

    }
});

const store = configureStore({
    reducer: gameReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(middleware);
    }
});

export default function GamePage() {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");

    if (!socket.connected) {
        socket.auth = (cb) => cb({ token: "yexy", game_id: "1" });
        socket.connect();
    }

    useEffect(() => {
        fetch(`/api/game/${id}`, { method: "POST" });
    }, [])

    return <Provider store={store}>
        Some text uaaaaaaaa
        <Players />
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

function Players() {
    const players = useAppSelector(store => store.players);

    return <ol>
        {players.map(player => <p>${player}</p>)}
    </ol>
}

function ShowTable() {
    const hand = useSelector<any, CardType<Suit, string | number>[]>(selector => selector.hand)
    return <div style={{ width: "200px", height: "200px", backgroundColor: "black" }} onDrop={e => console.log("drop")} onDragOver={e => e.preventDefault()}>

    </div>
}