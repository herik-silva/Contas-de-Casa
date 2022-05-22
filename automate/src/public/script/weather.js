const weather = {
    elements: {
        img: document.getElementById("imgWeather"),
        temp: document.querySelector("#temp"),
        city: document.querySelector("#city")
    },

    updateValues() {
        fetch("/weather").then((response) => {
            console.log(response.json().then(value => {
                this.elements.img.src = `http://openweathermap.org/img/w/${value.icon}.png`
                this.elements.temp.innerText = `${value.description} - ${value.temp}° - ${value.city}`
            }));
        })
    }
}

weather.updateValues();