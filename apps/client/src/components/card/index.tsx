import { Suit } from "@shared/types/cards";
import "./card.css";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
    suit: Suit,
    value: string | number,
    highlighted?: boolean
}

const suitMap = new Map<Suit, string>([
    ["Clubs", "♣"],
    ["Diamonds", "♦"],
    ["Hearts", "♥"],
    ["Spades", "♠"]
]);


export default function Card({ suit, value, highlighted = false, className, ...props }: CardProps) {
    const suitSymbol = suitMap.get(suit);

    return <div {...props} className={className + " " + `card ${suit === "Diamonds" || suit === "Hearts" ? "card-color-red" : "card-color-black"} ${highlighted ? "highlighted" : ""}`}>
        <div>
            <span>{value}</span>
            <span>{suitSymbol}</span>
        </div>
        <div>
            <span>{suitSymbol}</span>
        </div>
        <div>
            <span>{suitSymbol}</span>
            <span>{value}</span>
        </div>
    </div>
}