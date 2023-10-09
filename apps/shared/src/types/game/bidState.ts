import { NamedState } from "./named_state";

export type BidState = NamedState<"bid", Record<string, undefined | number>>;