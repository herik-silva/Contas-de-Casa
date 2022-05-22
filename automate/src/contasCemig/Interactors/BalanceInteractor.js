"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Balance_1 = __importDefault(require("../Entities/Balance"));
const fs_1 = require("fs");
class BalanceInteractor {
    constructor(databasePath) {
        console.log("CRIOU");
        this.databasePath = `${__dirname}/..${databasePath}`;
        this.load();
    }
    find(...args) {
        return this.balance;
    }
    findByPk(primaryKey) {
        throw "Não implementado";
    }
    insert(...args) {
        throw "Não implementado";
    }
    load() {
        try {
            const contentData = (0, fs_1.readFileSync)(this.databasePath, "utf-8");
            if (contentData) {
                const contentDataObject = JSON.parse(contentData);
                const currentValue = contentDataObject.currentValue;
                const billsPaid = contentDataObject.billsPaid;
                this.balance = new Balance_1.default(currentValue, billsPaid);
                return true;
            }
        }
        catch (error) {
            console.log("ERRO MEu BOM");
            throw error;
        }
    }
    remove(...args) {
        throw "Não implementado";
    }
    save() {
        try {
            const contentBalance = {
                currentValue: this.balance.getCurrentValue(),
                billsPaid: this.balance.getBillsPaid()
            };
            const contentBalanceStringify = JSON.stringify(contentBalance);
            (0, fs_1.writeFileSync)(this.databasePath, contentBalanceStringify);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    update(currentValue) {
        this.balance.setCurrentValue(currentValue);
        this.save();
        return true;
    }
}
exports.default = BalanceInteractor;
