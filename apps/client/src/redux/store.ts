import {
    type MiddlewareArray,
    type ThunkMiddleware,
    configureStore,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import {
    reducer as gameReducer,
    type actions as GameActions,
} from "./slices/game";
import {
    reducer as lobbyReducer,
    type actions as LobbyActions,
} from "./slices/lobby";
import { SocketMiddleware } from "./middleware/sockets.middleware";
import {
    LobbyClientEvents,
    LobbyServerEvents,
    GameClientEvents,
    GameServerEvents,
} from "shared/src/types/sockets";
import type { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import authService from "../services/authService";
import { storage } from "../services/storage";
import { reducer as authReducer } from "./slices/auth";

export const lobbyMiddleware = new SocketMiddleware<
    LobbyActions,
    LobbyClientEvents,
    LobbyServerEvents
>({
    active: false,
    on: {},
    socket: null,
});

export const gameMiddleware = new SocketMiddleware<
    GameActions,
    GameClientEvents,
    GameServerEvents
>({
    active: false,
    on: {},
    socket: null,
});

export class Store {
    public instance;

    constructor(config: StoreConfig) {
        this.instance = configureStore({
            devTools: config.isDev,
            reducer: {
                game: gameReducer,
                lobby: lobbyReducer,
                auth: authReducer,
            },
            middleware(getDefaultMiddleware) {
                return getDefaultMiddleware({
                    thunk: {
                        extraArgument: {
                            authService,
                            storage,
                        },
                    },
                }).concat();
            },
        });
    }
}

export const store = new Store({ isDev: true });

export interface StoreConfig {
    isDev: boolean;
}

export type StoreInfo = typeof store.instance extends ToolkitStore<
    infer State,
    any,
    MiddlewareArray<[ThunkMiddleware<any, any, infer Extra>]>
>
    ? { state: State; extra: Extra }
    : any;

export type StoreState = StoreInfo["state"];

export type AsyncThunkConfig = {
    state: StoreState;
    dispatch: typeof store.instance.dispatch;
    extra: StoreInfo["extra"];
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
};
