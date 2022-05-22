"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bills_1 = __importDefault(require("../Entities/Bills"));
const fs_1 = require("fs");
class BillsInteractor {
    constructor(databasePath) {
        console.log(`${__dirname}/..${databasePath}`);
        this.databasePath = `${__dirname}/..${databasePath}`;
        if (!this.load()) {
            this.lastId = 1;
            this.lastBills = new Array();
        }
    }
    insert(id, value, dueDate, code = null) {
        this.lastBills.push(new Bills_1.default(id, value, dueDate, code));
        this.save();
    }
    remove(id) {
        try {
            if (this.lastBills.length > 0) {
                console.log("\n\nBILLS ABAIXO");
                console.log(this.lastBills);
                console.log(id);
                const indexToRemove = this.lastBills.findIndex((bill => bill.getId() == id));
                console.log("PRA REMOVER INDEX: ", indexToRemove);
                if (indexToRemove != -1) {
                    for (let index = indexToRemove; index < this.lastBills.length; index++) {
                        this.lastBills[index] = this.lastBills[index + 1];
                        console.log(this.lastBills[index]);
                    }
                    // Remove last item
                    this.lastBills.pop();
                    this.save();
                    return true;
                }
                console.log("Objeto não existe!");
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    }
    update(id, value, dueDate, code = null) {
        const indexToEdit = this.lastBills.findIndex((bill => bill.getId() == id));
        if (!indexToEdit) {
            this.lastBills[indexToEdit].setValue(value);
            this.lastBills[indexToEdit].setDueDate(dueDate);
            this.lastBills[indexToEdit].setType(code);
            return true;
        }
        console.log("Objeto não existe para ser atualizado!");
        return false;
    }
    find() {
        return this.lastBills;
    }
    findByPk(primaryKey) {
        const selectedBills = this.lastBills.find((bills => bills.getId() == primaryKey));
        if (selectedBills) {
            this.lastBills.push(selectedBills);
        }
        return selectedBills;
    }
    save() {
        try {
            const contentData = {
                lastId: this.lastId,
                lastBills: this.lastBills
            };
            const lastBillsString = JSON.stringify(contentData);
            (0, fs_1.writeFileSync)(this.databasePath, lastBillsString);
            console.log("Salvo");
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    load() {
        try {
            const contentData = (0, fs_1.readFileSync)(this.databasePath, 'utf8');
            if (contentData) {
                const contentDataObject = JSON.parse(contentData);
                const listOfContentBills = contentDataObject.lastBills;
                this.lastId = contentDataObject.lastId;
                this.lastBills = new Array();
                for (let contentBills of listOfContentBills) {
                    this.lastBills.push(new Bills_1.default(contentBills.id, contentBills.value, contentBills.dueDate, contentBills.type));
                }
                return true;
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = BillsInteractor;
