import { Card, Suit } from "../cards";
import { NamedState } from "./named_state";

export type ActualState = NamedState<"actual", Record<string, { cards_count: number, table?: Card<Suit, string | number> }>>;