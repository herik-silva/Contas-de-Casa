class Weather {
    private main: string;
    private description: string;
    private icon: string;
    private temp: number;
    private city: string;
    private timestamp: number;

    constructor(main: string, description: string, icon: string, temp: number, city: string){
        this.main = main;
        this.description = description;
        this.icon = icon;
        this.temp = this.convertTempToCelsius(temp);
        this.city = city;
        this.timestamp = new Date().getTime();
    }

    public getTimestamp(): number {
        return this.timestamp
    }

    private convertTempToCelsius(temp: number): number{
        return Math.round(temp - 273.15);
    }

    public toStringify(): string {
        return JSON.stringify(this);
    }
}

export default Weather;