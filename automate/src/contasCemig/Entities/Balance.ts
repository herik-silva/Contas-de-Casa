import Bills from "./Bills";
import { lstat, readFileSync, writeFileSync } from "fs";

class Balance {
    private currentValue: number;
    private billsPaid: Array<Bills>;

    constructor(value: number, listOfBills: Array<Bills> = []){
        this.currentValue = value;
        this.billsPaid = listOfBills;
    }

    public getCurrentValue(): number {
        return this.currentValue;
    }

    public getBillsPaid(): Array<Bills> {
        return this.billsPaid;
    }

    public setCurrentValue(newValue: number): void {
        this.currentValue = newValue;
    }

    public addNewBillPaid(newBill: Bills): void {
        this.billsPaid.push(newBill);
    }

    public removeBillPaid(id: number): boolean {
        const billToRemove = this.billsPaid.findIndex(bill => bill.getId() == id);

        if(billToRemove){
            for(let index=billToRemove; index<this.billsPaid.length; index++){
                this.billsPaid[index] = this.billsPaid[index+1];
            }

            // Removendo ultimo elemento da lista.
            this.billsPaid.pop();
        }
        
        return true;
    }
}

export default Balance;