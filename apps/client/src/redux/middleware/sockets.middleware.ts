import {
    ActionCreatorWithPayload,
    AnyAction,
    Dispatch,
    Middleware,
    MiddlewareAPI,
    PayloadAction,
} from "@reduxjs/toolkit";
import { ToSocketIOEvents } from "@shared/types/utils";
import { Socket } from "socket.io-client";

export class SocketMiddleware<TActions, TOn, TEmit> {
    active: boolean;
    private socket: Socket | null;
    private stores: MiddlewareAPI<Dispatch<AnyAction>, any>[] = [];

    constructor(
        private readonly config: SocketMiddlewareConfig<TActions, TOn, TEmit>,
    ) {
        const { active = false, on = {}, emit = {}, socket = null } = config;

        this.active = active;
        this.socket = socket;

        const socketMiddleware: Middleware = function (
            this: SocketMiddleware<TActions, TOn, TEmit>,
            store,
        ) {
            this.stores.push(store);

            return (next) => (action: PayloadAction<unknown>) => {
                if (this.active && this.socket && action.type in emit) {
                    this.socket.emit(
                        (emit as Record<string, string>)[action.type],
                        action.payload,
                    );
                }
                next(action);
            };
        };

        return Object.assign(this, socketMiddleware);
    }

    private onEvent(event: string, data: any) {
        if (!this.active) return;

        console.log(SocketMiddleware.name, event, data);

        if (this.config.on && event in this.config.on) {
            for (const store of this.stores) {
                const type: string = (this.config.on as any)[event];
                store.dispatch({ type, payload: data });
            }
        }
    }

    useConnection(socket: Socket | null) {
        this.socket?.offAny(this.onEvent);

        socket?.onAny(this.onEvent);

        this.socket = socket;
    }
}

export declare interface SocketMiddleware<TActions, TOn, TEmit> {
    new (): SocketMiddleware<TActions, TOn, TEmit> & Middleware;

    useConnection(socket: Socket): void;

    active: boolean;
}

export type SocketMiddlewareConfig<TActions, TOn, TEmit> = {
    active?: boolean;
    on?: KeysTypeBinding<TOn, TActions>;
    emit?: KeysTypeBinding<TActions, TEmit>;
    socket?: Socket<ToSocketIOEvents<TOn>, ToSocketIOEvents<TEmit>> | null;
};

export type GetFromArray<T> = T extends [infer First, ...infer Rest]
    ? (First extends ActionCreatorWithPayload<infer Type, infer Name>
          ? { [P in Name]: Type }
          : never) &
          GetFromArray<Rest>
    : {};

type KeysTypeBinding<T1, T2> = {
    [K1 in keyof T1]?:
        | {
              [K2 in keyof T2]: T1[K1] extends T2[K2] ? K2 : never;
          }[keyof T2]
        | String;
};

export type GetFromObj<T> = UnionToIntersection<
    Extract<{
        [K1 in {
            [K in keyof T]: T[K] extends ActionCreatorWithPayload<any, string>
                ? K
                : never;
        }[keyof T]]: T[K1];
    }>
>;

type Extract<T> = {
    [K in keyof T]: T[K] extends ActionCreatorWithPayload<
        infer Type,
        infer Name
    >
        ? Record<Name, Type>
        : never;
}[keyof T];

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I,
) => void
    ? I
    : never;
