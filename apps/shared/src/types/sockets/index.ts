export {
    ServerEvents as GameServerEvents,
    ClientEvents as GameClientEvents,
} from "./game_events";
export {
    ServerEvents as LobbyServerEvents,
    ClientEvents as LobbyClientEvents,
    AuthFormat as LobbyAuthFormat,
} from "./lobby_events";

export type ToSocketIOEvents<T extends Record<string, any>> = {
    [K in keyof T]: (arg: T[K]) => void;
};
