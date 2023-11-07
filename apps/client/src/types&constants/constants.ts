export const STORAGE_KEY = ["REFRESH_TOKEN"] as const;

export const DataStatus = {
    IDLE: "idle",
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
} as const;
