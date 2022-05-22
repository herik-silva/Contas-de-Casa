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
const Weather_1 = __importDefault(require("../Entities/Weather"));
const axios_1 = __importDefault(require("axios"));
class WeatherPresenter {
    constructor(url, key) {
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
    requestWeather(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Caso exista uma informação de clima e seu tempo não tenha expirado, retorne a informação contida.
            if (this.lastWeather) {
                const limitTime = this.lastWeather.getTimestamp() + this.timeInMilliseconds;
                // Caso o tempo limite seja maior que o tempo atual, retorne a ultima informação do clima.
                if (new Date().getTime() < limitTime) {
                    return this.lastWeather;
                }
            }
            // Caso não exista uma informação do clima ou seu tempo limite expirou, faça uma nova consulta.
            const resp = yield axios_1.default.get(this.urlRequest + this.keyAcess);
            const main = resp.data.weather[0].main;
            const description = resp.data.weather[0].description;
            const icon = resp.data.weather[0].icon;
            const temp = parseFloat(resp.data.main.feels_like);
            const city = resp.data.name;
            const weather = new Weather_1.default(main, description, icon, temp, city);
            this.lastWeather = weather;
            return this.lastWeather;
        });
    }
}
exports.default = WeatherPresenter;
