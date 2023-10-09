import { zip } from "lodash"

export interface RowActions<TData> {
    get(column: string): TData;

    set(column: string, value: TData): void

    read(): TData[]
}

export class Table<TData = any> {
    private readonly _rows: Map<string, TData>[];
    private readonly _columns: string[] = [];

    constructor(columns: string[], private readonly default_value: TData) {
        for (const column of columns) {
            this.addColumn(column);
        }
        this._rows = [];
    }

    get columns() {
        return [...this._columns];
    }

    addColumn(column: string) {
        this.columns.push(column);
        for (const rows of this._rows.values()) {
            rows.set(column, this.default_value);
        }
    }

    removeColumn(column: string) {
        const index = this.columns.indexOf(column);

        if (index == -1) return false;

        this._columns.splice(index);
        for (const rows of this._rows) {
            rows.delete(column);
        }

        return true;
    }

    readColumn(column: string) {
        if (!this._columns.includes(column)) throw new Error("Column does not exist");

        const res: TData[] = [];
        for (const row of this._rows) {
            res.push(row.get(column)!);
        }
        return res;
    }

    hasColumn(column: string) {
        return this.columns.includes(column);
    }

    get(column: string, row: number) {
        if (!this.columns.includes(column)) throw new Error("Column does not exist")
        if (!(row in this._rows)) throw new Error("Row does not exist")
        this._rows[row].get(column);
    }

    tryGet(column: string, row: number, out: { value?: TData }) {
        if (!this.columns.includes(column)) return false;
        if (!(row in this._rows)) return false;
        out.value = this._rows[row].get(column)
        return true;
    }

    set(column: string, row: number, value: TData) {
        if (!this.columns.includes(column)) throw new Error("Column does not exist")
        if (!(row in this._rows)) throw new Error("Row does not exist")
        this._rows[row].set(column, value);
    }

    trySet(column: string, row: number, value: TData) {
        if (!this.columns.includes(column)) return false;
        if (!(row in this._rows)) return false;
        this._rows[row].set(column, value);
        return true;
    }

    appendRow() {
        this._rows.push(new Map(this.columns.map(column => [column, this.default_value])));

        return this.row(-1);
    }

    row(row: number) {
        const _row = this._rows.at(row);

        if (!_row) throw new Error("Row does not exist");

        return {
            get(column: string) {
                if (_row.has(column)) throw new Error("Column does not exist")
                return _row.get(column)!;
            },

            set(column: string, value: TData) {
                if (_row.has(column)) throw new Error("Column does not exist")
                _row.set(column, value);
            },

            read() {
                return Array.from(_row.values());
            }
        }
    }
}