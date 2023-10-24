import type {
    ActionCreatorWithPayload,
    Middleware,
    PayloadAction,
} from "@reduxjs/toolkit";
import type { Socket } from "socket.io-client";
import type { ClientEvents, ServerEvents } from "@shared/types/game/events";
import { ToSocketIOEvents } from "@shared/types/utils";

export class GameConnection {
    constructor(public readonly socket: Socket) {}

    createMiddleware =
        <T extends Record<string, any>>(
            config: SocketMiddlewareConfig<T, ServerEvents, ClientEvents>,
        ): Middleware =>
        (store) => {
            const { on = {}, emit = {} } = config;

            const emitMap: Map<string, string> = new Map(Object.entries(emit));

            let server_data;
            for (const [message, action] of Object.entries(on)) {
                this.socket.on(message, (data) => {
                    store.dispatch({ type: action, payload: data });
                    server_data = data;
                });
            }

            return (next) => (action: PayloadAction<unknown>) => {
                if (emitMap.has(action.type)) {
                    this.socket.emit(emitMap.get(action.type)!, action.payload);
                }

                next(action);
            };
        };
}

export interface SocketMiddlewareConfig<
    TActions extends Record<string, any>,
    TOn extends Record<string, any>,
    TEmit extends Record<string, any>,
> {
    on?: KeysTypeBinding<TOn, TActions>;
    emit?: KeysTypeBinding<TActions, TEmit>;
}

export type GetFromArray<T> = T extends [infer First, ...infer Rest]
    ? (First extends ActionCreatorWithPayload<infer Type, infer Name>
          ? { [P in Name]: Type }
          : never) &
          GetFromArray<Rest>
    : {};

type KeysTypeBinding<
    T1 extends Record<string, any>,
    T2 extends Record<string, any>,
> = {
    [K1 in keyof T1]?:
        | {
              [K2 in keyof T2]: T1[K1] extends T2[K2] ? K2 : never;
          }[keyof T2]
        | String;
};

export type GetFromObj<T extends Record<string, any>> = UnionToIntersection<
    Extract<{
        [K1 in {
            [K in keyof T]: T[K] extends ActionCreatorWithPayload<any, string>
                ? K
                : never;
        }[keyof T]]: T[K1];
    }>
>;

type Extract<T extends Record<string, ActionCreatorWithPayload<any, string>>> =
    {
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
