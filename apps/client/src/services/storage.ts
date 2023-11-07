import { StorageKey } from "../types&constants/type";

export class Storage {
    constructor(private readonly store: globalThis.Storage) {}

    public set(key: StorageKey, value: string) {
        this.store.setItem(key as string, value);
    }

    public get(key: StorageKey) {
        return this.store.getItem(key as string);
    }

    public drop(key: StorageKey) {
        this.store.removeItem(key as string);
    }

    public async has(key: StorageKey): Promise<boolean> {
        return Boolean(this.get(key));
    }
}

export const storage = new Storage(localStorage);
