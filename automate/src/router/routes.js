"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BalancePresenter_1 = __importDefault(require("../contasCemig/Presenters/BalancePresenter"));
const BillsPresenter_1 = __importDefault(require("../contasCemig/Presenters/BillsPresenter"));
const WeatherPresenter_1 = __importDefault(require("../contasCemig/Presenters/WeatherPresenter"));
const router = (0, express_1.Router)();
const billsPresenter = new BillsPresenter_1.default();
const balancePresenter = new BalancePresenter_1.default();
const weatherPresenter = new WeatherPresenter_1.default(process.env.LINK_ACESS, process.env.TOKEN);
router.get("/", (request, response) => {
    return response.sendFile("index.html");
});
router.get("/weather", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const weather = yield weatherPresenter.requestWeather(request, response);
    return response.send(weather);
}));
router.get("/bills", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const listOfBills = billsPresenter.getAllBills(request, response);
    console.log(listOfBills);
    if (listOfBills) {
        return response.send(listOfBills);
    }
    const error = {
        "status": 404,
        "message": "Nenhuma conta cadastrada!"
    };
    return response.send(error);
}));
router.get("/balance", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const balance = balancePresenter.getBalance(request, response);
    return response.send(balance);
}));
router.post("/balance", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const option = request.body.option;
    switch (option) {
        case "insert":
            throw "Não implementado";
            break;
        case "update":
            yield balancePresenter.updateValue(request, response);
            break;
    }
}));
router.post("/bills", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const option = request.body.option;
    console.log(request.body);
    switch (option) {
        case "insert":
            yield billsPresenter.insertBill(request, response);
            break;
        case "remove":
            yield billsPresenter.removeBill(request, response);
            break;
    }
}));
router.get("/bills/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.params.id) {
        const bill = yield billsPresenter.getBill(request, response);
        if (bill) {
            return response.send(bill);
        }
        const error = {
            "status": 404,
            "message": "Conta não encontrada!"
        };
        return response.send(error);
    }
}));
exports.default = router;
