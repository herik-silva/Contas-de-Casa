const controllerBalance = {
    situation: {
        POSITIVE: "positive",
        NEGATIVE: "negative"
    },
    currentValue: 0,
    element: document.querySelector("#saldoAtual"),
    border: document.querySelector(".saldo"),
    balanceSituation: undefined,

    /**
     * Verifica se a situação do saldo é positiva ou negativa e altera sua cor
     * @param {number} value 
     * @returns {number}
     */
    checkSituation(value){
        const color = {
            red: "rgb(200, 38, 38)",
            green: "rgb(38, 200, 38)"
        }

        if(this.isNegative(value)){
            this.balanceSituation = this.situation.NEGATIVE;
            this.border.style.borderColor = color.red;
            
            return value
        }
        else{
            this.balanceSituation = this.situation.POSITIVE;
            this.border.style.borderColor = color.green;
            return value;
        }
    },

    /**
     * Remove o tipo de moeda
     * @param {string} value 
     * @returns {string}
     */
    removeCurrency(value) {
        return value.slice(3);
    },

    /**
     * Converte o valor para ponto flutuante
     * @param {string} valueToConvert 
     */
    convertToFloat(valueToConvert) {
        if(valueToConvert.includes("R$")){
            let value = this.removeCurrency(valueToConvert.replace(".",""));
            
            // Substitui a virgula pelo ponto para realizar a conversão corretamente.
            return parseFloat(value.replace(",","."));
        }

        return parseFloat(valueToConvert);
    },

    /**
     * Verifica se o valor passado é positivo ou negativo
     * @param {number} value 
     */
    isNegative(value) {
        if(value >= 0){
            return false;
        }
        else{
            return true;
        }
    },

    updateElement(newValue) {
        controllerBalance.element.innerText = newValue.split("R$ ");
    },

    debitCurrentValue(decrement) {
        console.log(this.currentValue);
        this.currentValue = this.currentValue - decrement;
    },

    updateBalance(value) {
        const newValue = controllerBalance.checkSituation(value);

        const convertedValue = newValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
        this.updateElement(convertedValue);
    },

    updateValue() {
        if(controllerInputs.validateInput(controller.selectedInterface)){
            const value = controllerBalance.convertToFloat(controllerInputs.getValues("BALANCE")[0]);
            controllerBalance.currentValue = value;

            controllerBalance.updateBalance(value);

            controllerInputs.clearInputs(controller.selectedInterface);
            closeInterface();
            navigator.vibrate(200);
        }
        else{
            alert("Preencha o campo com o saldo atual");
        }
    },

    animationDecrement(convertedValue) {
        const color = {
            red: "rgb(200, 38, 38)",
            green: "rgb(38, 200, 38)"
        }
        var animationValue = this.currentValue;
        controllerBalance.debitCurrentValue(convertedValue);

        var decrementationValue;
        
        if(convertedValue>=1000){
            decrementationValue = 55.05;
        }
        else if(convertedValue >= 100){
            decrementationValue = 11.05;
        }
        else{
            decrementationValue = 1.05;
        }

        var interval = setInterval(()=>{
            if(animationValue > this.currentValue){
                animationValue = animationValue - decrementationValue;
                controllerBalance.updateBalance(animationValue);
                this.border.style.borderColor = color.red;
                console.log("CONTANDO: ",this.currentValue);
                navigator.vibrate(1);
            }
            else{
                controllerBalance.updateBalance(this.currentValue);
                clearInterval(interval);
            }
        },50);
    },
    
    debitAccount(value) {
        const convertedValue = this.convertToFloat(value);
        this.animationDecrement(convertedValue);
        const balance = {
            currentValue: this.currentValue
        }
        controllers.send(balance,"balance", "update");
        navigator.vibrate(100);
    }

}