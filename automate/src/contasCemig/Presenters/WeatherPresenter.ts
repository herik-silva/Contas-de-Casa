import { Request, Response } from "express";
import Weather from "../Entities/Weather";
import axios from "axios";

class WeatherPresenter {
    private lastWeather: Weather;
    private urlRequest: string;
    private keyAcess: string;
    private timeInMilliseconds: number;

    constructor(url: string, key: string){
        this.urlRequest = url;
        this.keyAcess = key;
        this.timeInMilliseconds = 600000;
    }

    /**
     * Realiza a consulta do tempo e retorna as informações
     * @param request 
     * @param response 
     * @returns 
     */
    public async requestWeather(request: Request, response: Response): Promise<Weather> {
        // Caso exista uma informação de clima e seu tempo não tenha expirado, retorne a informação contida.
        if(this.lastWeather){
            const limitTime = this.lastWeather.getTimestamp() + this.timeInMilliseconds;

            // Caso o tempo limite seja maior que o tempo atual, retorne a ultima informação do clima.
            if(new Date().getTime() < limitTime){
                return this.lastWeather;
            }
        }

        // Caso não exista uma informação do clima ou seu tempo limite expirou, faça uma nova consulta.
        const resp = await axios.get(this.urlRequest+this.keyAcess);
        const main = resp.data.weather[0].main;
        const description = resp.data.weather[0].description;
        const icon = resp.data.weather[0].icon;
        const temp = parseFloat(resp.data.main.feels_like);
        const city = resp.data.name;
        
        const weather = new Weather(main,description,icon,temp,city);
        
        this.lastWeather = weather;

        return this.lastWeather;
    }
}

export default WeatherPresenter;