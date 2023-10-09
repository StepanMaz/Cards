"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
class Table {
    constructor(columns, default_value) {
        this.default_value = default_value;
        this._columns = [];
        for (const column of columns) {
            this.addColumn(column);
        }
        this._rows = [];
    }
    get columns() {
        return [...this._columns];
    }
    addColumn(column) {
        this.columns.push(column);
        for (const rows of this._rows.values()) {
            rows.set(column, this.default_value);
        }
    }
    removeColumn(column) {
        const index = this.columns.indexOf(column);
        if (index == -1)
            return false;
        this._columns.splice(index);
        for (const rows of this._rows) {
            rows.delete(column);
        }
        return true;
    }
    readColumn(column) {
        if (!this._columns.includes(column))
            throw new Error("Column does not exist");
        const res = [];
        for (const row of this._rows) {
            res.push(row.get(column));
        }
        return res;
    }
    hasColumn(column) {
        return this.columns.includes(column);
    }
    get(column, row) {
        if (!this.columns.includes(column))
            throw new Error("Column does not exist");
        if (!(row in this._rows))
            throw new Error("Row does not exist");
        this._rows[row].get(column);
    }
    tryGet(column, row, out) {
        if (!this.columns.includes(column))
            return false;
        if (!(row in this._rows))
            return false;
        out.value = this._rows[row].get(column);
        return true;
    }
    set(column, row, value) {
        if (!this.columns.includes(column))
            throw new Error("Column does not exist");
        if (!(row in this._rows))
            throw new Error("Row does not exist");
        this._rows[row].set(column, value);
    }
    trySet(column, row, value) {
        if (!this.columns.includes(column))
            return false;
        if (!(row in this._rows))
            return false;
        this._rows[row].set(column, value);
        return true;
    }
    appendRow() {
        this._rows.push(new Map(this.columns.map(column => [column, this.default_value])));
        return this.row(-1);
    }
    row(row) {
        const _row = this._rows.at(row);
        if (!_row)
            throw new Error("Row does not exist");
        return {
            get(column) {
                if (_row.has(column))
                    throw new Error("Column does not exist");
                return _row.get(column);
            },
            set(column, value) {
                if (_row.has(column))
                    throw new Error("Column does not exist");
                _row.set(column, value);
            },
            read() {
                return Array.from(_row.values());
            }
        };
    }
}
exports.Table = Table;
