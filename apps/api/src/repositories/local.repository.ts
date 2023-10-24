export class LocalRepository<TEntity> {
    private readonly data = new Map<string, TEntity>();

    set(id: string, entity: TEntity) {
        this.data.set(id, entity);
    }

    has(id: string) {
        return this.data.has(id);
    }

    delete(id: string) {
        return this.data.delete(id);
    }

    get(id: string) {
        return this.data.get(id);
    }

    all() {
        return [...this.data.values()];
    }
}
