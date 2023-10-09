export type NamedState<T extends string, TData> = {
    name: T,
    data: TData
}