const controllerTheme = {
    theme: "LIGHT",
    toChange: [".container",".header-app",".change",".cemig",".internet"],
    themes: {
        LIGHT: { // PrimaryClass: ClassTheme
            ".container": "l-container",
            ".header-app": "l-header",
            ".change": "l-btn-change",
            ".cemig": "l-card",
            ".internet": "l-card",
        },
        DARK: {
            ".container": "d-container",
            ".header-app": "d-header",
            ".change": "d-btn-change",
            ".cemig": "d-card",
            ".internet": "d-card",
        }
    },
    btnChange: document.querySelector("#btnTheme"),

    setTheme() {
        const selectedTheme = this.themes[this.theme];

        for(let index=0; index<this.toChange.length; index++){
            const newClass = selectedTheme[this.toChange[index]];
            const element = document.querySelector(this.toChange[index]);
            if(this.toChange[index].includes(".change")){
                if(this.theme == "LIGHT"){
                    element.innerText = "☀️";
                }
                else{
                    element.innerText = "🌑";
                }
            }
            if(element.classList[1]){
                let remove = element.classList[1];
                element.classList.replace(remove, newClass);
            }
            else{
                element.classList.add(newClass);
            }
        }

        this.theme = this.theme == "LIGHT" ? "DARK" : "LIGHT";
    }
}

controllerTheme.btnChange.addEventListener("click", ()=>{controllerTheme.setTheme()});
controllerTheme.setTheme();