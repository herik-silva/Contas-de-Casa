"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Weather {
    constructor(main, description, icon, temp, city) {
        this.main = main;
        this.description = description;
        this.icon = icon;
        this.temp = this.convertTempToCelsius(temp);
        this.city = city;
        this.timestamp = new Date().getTime();
    }
    getTimestamp() {
        return this.timestamp;
    }
    convertTempToCelsius(temp) {
        return Math.round(temp - 273.15);
    }
    toStringify() {
        return JSON.stringify(this);
    }
}
exports.default = Weather;
