"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BillsInteractor_1 = __importDefault(require("../Interactors/BillsInteractor"));
class BillsPresenter {
    constructor() {
        this.billsInteractor = new BillsInteractor_1.default('/database/bills.json');
    }
    /**
     * Pega as informações de todas as contas
     * @param request
     * @param response
     * @returns
     */
    getAllBills(request, response) {
        const bills = this.billsInteractor.find();
        if (bills) {
            return bills;
        }
    }
    /**
     * Pega as informações da conta selecionada
     * @param request
     * @param response
     * @returns
     */
    getBill(request, response) {
        const billId = parseInt(request.params.id);
        const selectedBill = this.billsInteractor.findByPk(billId);
        if (selectedBill) {
            return selectedBill;
        }
    }
    /**
     * Insere uma conta no banco de dados
     * @param request
     * @param response
     */
    insertBill(request, response) {
        const body = request.body.data;
        var number = body.value.slice(10);
        const convertedValue = parseFloat(number.replace(".", "").replace(",", "."));
        const bill = {
            id: parseInt(body.id),
            newDate: body.newDate.split(": ")[1],
            value: convertedValue,
            type: body.type
        };
        this.billsInteractor.insert(bill.id, bill.value, bill.newDate, bill.type);
    }
    /**
     * Remove uma conta do banco de dados
     * @param request
     * @param response
     */
    removeBill(request, response) {
        const idToRemove = request.body.data;
        console.log(idToRemove);
        this.billsInteractor.remove(idToRemove);
    }
}
exports.default = BillsPresenter;
