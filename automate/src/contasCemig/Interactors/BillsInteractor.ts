import Bills from "../Entities/Bills";
import Interactor from "./Interactor";
import { readFileSync, writeFileSync } from "fs";

class BillsInteractor implements Interactor {
    private lastBills: Array<Bills>;
    private lastId: number;
    private databasePath: string;

    constructor(databasePath: string){
        console.log(`${__dirname}/..${databasePath}`);
        this.databasePath = `${__dirname}/..${databasePath}`;
        
        if(!this.load()){
            this.lastId = 1;
            this.lastBills = new Array<Bills>();
        }
    }

    insert(id: number, value: number, dueDate: string, code: string = null): void {
        this.lastBills.push(new Bills(id, value, dueDate, code));
        this.save();
    }

    remove(id: number): boolean {
        try{
            if(this.lastBills.length>0){
                console.log("\n\nBILLS ABAIXO")
                console.log(this.lastBills);
                console.log(id);
                const indexToRemove = this.lastBills.findIndex((bill => bill.getId() == id));

                console.log("PRA REMOVER INDEX: ", indexToRemove);

                if(indexToRemove != -1){
                    for(let index=indexToRemove; index<this.lastBills.length; index++){
                        this.lastBills[index] = this.lastBills[index+1];
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

        }catch(error){
            throw error;
        }
    }

    update(id: number, value: number, dueDate: String, code: String = null): boolean {
        const indexToEdit = this.lastBills.findIndex((bill => bill.getId() == id));

        if(!indexToEdit){
            this.lastBills[indexToEdit].setValue(value);
            this.lastBills[indexToEdit].setDueDate(dueDate);
            this.lastBills[indexToEdit].setType(code);

            return true;
        }

        console.log("Objeto não existe para ser atualizado!");
        return false;
    }

    find(): Array<Bills> {
        return this.lastBills;
    }

    findByPk(primaryKey: number) {
        const selectedBills = this.lastBills.find((bills => bills.getId() == primaryKey));
        if(selectedBills){
            this.lastBills.push(selectedBills);
        }

        return selectedBills;
    }

    save(): boolean {
        try{
            const contentData = {
                lastId: this.lastId,
                lastBills: this.lastBills
            }

            const lastBillsString = JSON.stringify(contentData);

            writeFileSync(this.databasePath, lastBillsString);
            console.log("Salvo");

            return true;


        }catch(error){
            throw error;
        }
    }

    load(): boolean {
        try{
            const contentData = readFileSync(this.databasePath, 'utf8');

            if(contentData){
                const contentDataObject = JSON.parse(contentData);
                const listOfContentBills = contentDataObject.lastBills;

                this.lastId = contentDataObject.lastId;
                this.lastBills = new Array<Bills>();

                for(let contentBills of listOfContentBills){
                    this.lastBills.push(new Bills(contentBills.id, contentBills.value, contentBills.dueDate, contentBills.type));
                }
                return true;
            }
            
            return false;
        }
        catch(error){
            throw error;
        }
    }

}

export default BillsInteractor;