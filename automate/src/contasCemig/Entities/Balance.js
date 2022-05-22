"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Balance {
    constructor(value, listOfBills = []) {
        this.currentValue = value;
        this.billsPaid = listOfBills;
    }
    getCurrentValue() {
        return this.currentValue;
    }
    getBillsPaid() {
        return this.billsPaid;
    }
    setCurrentValue(newValue) {
        this.currentValue = newValue;
    }
    addNewBillPaid(newBill) {
        this.billsPaid.push(newBill);
    }
    removeBillPaid(id) {
        const billToRemove = this.billsPaid.findIndex(bill => bill.getId() == id);
        if (billToRemove) {
            for (let index = billToRemove; index < this.billsPaid.length; index++) {
                this.billsPaid[index] = this.billsPaid[index + 1];
            }
            // Removendo ultimo elemento da lista.
            this.billsPaid.pop();
        }
        return true;
    }
}
exports.default = Balance;
