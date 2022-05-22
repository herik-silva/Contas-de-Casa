import Balance from "../Entities/Balance";
import Interactor from "./Interactor";
import { readFileSync, writeFileSync } from "fs";

class BalanceInteractor implements Interactor {
    private balance: Balance;
    private databasePath: string;

    constructor(databasePath: string) {
        console.log("CRIOU");
        this.databasePath = `${__dirname}/..${databasePath}`;
        this.load();
    }

    public find(...args: any[]) {
        return this.balance;
    }

    public findByPk(primaryKey: any) {
        throw "Não implementado";
    }

    public insert(...args: any[]): void {
        throw "Não implementado";
    }
    
    load(): boolean {
        try{
            const contentData = readFileSync(this.databasePath, "utf-8");

            if(contentData){
                const contentDataObject = JSON.parse(contentData);
                const currentValue = contentDataObject.currentValue;
                const billsPaid = contentDataObject.billsPaid;

                this.balance = new Balance(currentValue, billsPaid);

                return true;
            }
        }
        catch(error){
            console.log("ERRO MEu BOM");
            throw error;
        }
    }

    public remove(...args: any[]): boolean {
        throw "Não implementado";
    }

    save(): boolean {
        try{
            const contentBalance = {
                currentValue: this.balance.getCurrentValue(),
                billsPaid: this.balance.getBillsPaid()
            }

            const contentBalanceStringify = JSON.stringify(contentBalance);

            writeFileSync(this.databasePath, contentBalanceStringify);

            return true;
        }
        catch(error){
            throw error;
        }
    }

    update(currentValue: number): boolean {
        this.balance.setCurrentValue(currentValue);
        this.save();

        return true;
    }
}

export default BalanceInteractor;