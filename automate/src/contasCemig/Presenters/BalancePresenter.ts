import { Request, Response } from "express";
import Balance from "../Entities/Balance";
import BalanceInteractor from "../Interactors/BalanceInteractor";

class BalancePresenter {
    private balanceInteractor: BalanceInteractor;

    constructor() {
        this.balanceInteractor = new BalanceInteractor("/database/balance.json");
    }

    /**
     * Atualiza o valor do saldo da conta
     * @param request 
     * @param response 
     */
    public updateValue(request: Request, response: Response) {
        const newValue = parseFloat(request.body.data.currentValue);

        this.balanceInteractor.update(newValue);
    }

    /**
     * Pega o valor do saldo da conta
     * @param request 
     * @param response 
     * @returns 
     */
    public getBalance(request: Request, response: Response): Balance {
        const balance = this.balanceInteractor.find()
        return balance;
    }
}

export default BalancePresenter;