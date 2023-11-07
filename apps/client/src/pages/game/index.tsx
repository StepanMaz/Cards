import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { GameState, reducer as gameReducer } from "../../redux/slices/game";
import { io } from "socket.io-client";
import { Suit, Card as CardType } from "@shared/types/cards";
import Card from "../../components/card";
import "./styles.css";
import { useEffect, useMemo, useRef, useState } from "react";

export default function GamePage() {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");

    useEffect(() => {
        fetch(`/api/game/${id}`, { method: "POST" });
    }, []);

    return " Some text uaaaaaaaa";
}

function ShowHand() {
    const hand = useSelector<any, CardType<Suit, string | number>[]>(
        (selector) => selector.hand,
    );

    return (
        <div className="cards-hand">
            {hand.map((card, index) => (
                <Card
                    className="focusable"
                    key={index}
                    draggable
                    suit={card.suit}
                    value={card.value}
                />
            ))}
        </div>
    );
}
