"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BalanceInteractor_1 = __importDefault(require("../Interactors/BalanceInteractor"));
class BalancePresenter {
    constructor() {
        this.balanceInteractor = new BalanceInteractor_1.default("/database/balance.json");
    }
    /**
     * Atualiza o valor do saldo da conta
     * @param request
     * @param response
     */
    updateValue(request, response) {
        const newValue = parseFloat(request.body.data.currentValue);
        this.balanceInteractor.update(newValue);
    }
    /**
     * Pega o valor do saldo da conta
     * @param request
     * @param response
     * @returns
     */
    getBalance(request, response) {
        const balance = this.balanceInteractor.find();
        return balance;
    }
}
exports.default = BalancePresenter;
