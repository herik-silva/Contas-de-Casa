"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bills {
    constructor(id, value, dueDate, type) {
        this.id = id;
        this.value = value;
        this.dueDate = dueDate;
        this.type = type;
    }
    getId() {
        return this.id;
    }
    getValue() {
        return this.value;
    }
    getDueDate() {
        return this.dueDate;
    }
    getType() {
        return this.type;
    }
    setValue(newValue) {
        this.value = newValue;
    }
    setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }
    setType(newType) {
        this.type = newType;
    }
}
exports.default = Bills;
