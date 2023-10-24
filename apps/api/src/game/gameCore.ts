import { State } from "./states";

export class GameCore<TPlayer> {
    private _state: State<TPlayer>;

    get state() {
        return this._state;
    }

    private _players: TPlayer[] = [];

    get players(): readonly TPlayer[] {
        return this._players;
    }

    get currentRound() {
        return {
            players: new Map<TPlayer, RoundPlayerInfo>() as PlayersCollection<
                TPlayer,
                RoundPlayerInfo
            >,
        };
    }

    setStateActive() {
        console.log("State active");
    }

    public temp_addPlayer(player: TPlayer) {
        this._players.push(player);
    }
}

interface PlayersCollection<K, V> {
    get(key: K): V;
    values(): Generator<V>;
}

interface RoundPlayerInfo {
    bid?: number;
}
