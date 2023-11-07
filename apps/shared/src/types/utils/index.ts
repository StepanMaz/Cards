export type ValuesOf<T> = T[keyof T];
export type ToSocketIOEvents<T> = {
    [Name in keyof T]: (message: T[Name]) => void;
};

export type ExtractOfType<T extends Record<string, any>, Type> = {
    [K in keyof T]: T[K] extends Type ? T[K] : never;
}[keyof T];
