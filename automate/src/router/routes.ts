import { Router, Request, Response } from "express";
import BalancePresenter from "../contasCemig/Presenters/BalancePresenter";
import BillsPresenter from "../contasCemig/Presenters/BillsPresenter";
import WeatherPresenter from "../contasCemig/Presenters/WeatherPresenter";

const router = Router(); 
const billsPresenter = new BillsPresenter();
const balancePresenter = new BalancePresenter();
const weatherPresenter = new WeatherPresenter(process.env.LINK_ACESS,process.env.TOKEN);

router.get("/", (request: Request, response: Response) => {
    return response.sendFile("index.html");
});

router.get("/weather", async(request: Request, response: Response) => {
    const weather = await weatherPresenter.requestWeather(request, response);
    return response.send(weather);
})

router.get("/bills", async(request: Request, response: Response) => {
    const listOfBills = billsPresenter.getAllBills(request, response);

    console.log(listOfBills);

    if(listOfBills){
        return response.send(listOfBills);
    }

    const error = {
        "status": 404,
        "message": "Nenhuma conta cadastrada!"
    }

    return response.send(error);
});

router.get("/balance", async(request: Request, response: Response) => {
    const balance = balancePresenter.getBalance(request, response);

    return response.send(balance);
})

router.post("/balance", async (request: Request, response: Response)=> {
    const option = request.body.option;
    switch(option){
        case "insert":
            throw "Não implementado";
            break;

        case "update":
            await balancePresenter.updateValue(request, response);
            break;
    }
});

router.post("/bills", async(request: Request, response: Response) => {
    const option = request.body.option;
    console.log(request.body);
    switch(option){
        case "insert":
            await billsPresenter.insertBill(request, response);
            break;
        
        case "remove":
            await billsPresenter.removeBill(request, response);
            break;
    }
})

router.get("/bills/:id", async(request: Request, response: Response) => {
    if(request.params.id){
        const bill = await billsPresenter.getBill(request, response);
        
        if(bill){
            return response.send(bill);
        }

        const error = {
            "status": 404,
            "message": "Conta não encontrada!"
        }

        return response.send(error);
    }
});

export default router;