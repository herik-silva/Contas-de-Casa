import { Request, Response } from "express";
import Bills from "../Entities/Bills";
import BillsInteractor from "../Interactors/BillsInteractor";

class BillsPresenter {
    private billsInteractor: BillsInteractor;

    constructor(){
        this.billsInteractor = new BillsInteractor('/database/bills.json');
    }

    /**
     * Pega as informações de todas as contas
     * @param request 
     * @param response 
     * @returns 
     */
    public getAllBills(request: Request, response: Response): Array<Bills> {
        const bills = this.billsInteractor.find();

        if(bills){
            return bills;
        }
    }

    /**
     * Pega as informações da conta selecionada
     * @param request 
     * @param response 
     * @returns 
     */
    public getBill(request: Request, response: Response): Bills {
        const billId = parseInt(request.params.id);
        const selectedBill = this.billsInteractor.findByPk(billId);
    
        if(selectedBill){
            return selectedBill;
        }
    }

    /**
     * Insere uma conta no banco de dados
     * @param request 
     * @param response 
     */
    public insertBill(request: Request, response: Response) {
        const body = request.body.data;
        var number = body.value.slice(10);
        const convertedValue = parseFloat(number.replace(".","").replace(",","."));
        const bill = {
            id: parseInt(body.id),
            newDate: body.newDate.split(": ")[1],
            value: convertedValue,
            type: body.type
        }

        this.billsInteractor.insert(bill.id, bill.value, bill.newDate, bill.type);
    }

    /**
     * Remove uma conta do banco de dados
     * @param request 
     * @param response 
     */
    public removeBill(request: Request, response: Response) {
        const idToRemove = request.body.data;
        console.log(idToRemove);
        this.billsInteractor.remove(idToRemove);
    }
}

export default BillsPresenter;