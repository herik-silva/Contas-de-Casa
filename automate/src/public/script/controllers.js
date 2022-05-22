const controllers = {
    requestedData: false,
    btnActions: {
        addBill: document.querySelector("#addBill"),
        updateBalance: document.querySelector("#options")
    },

    setListenners() {
        this.btnActions.addBill.addEventListener("click", ()=>{ showInterface("NEW_CARD") });
        this.btnActions.updateBalance.addEventListener("click", ()=>{ showInterface("BALANCE") });

        controllerInputs.groups.NEW_CARD.btnClose.addEventListener("click", closeInterface);
        controllerInputs.groups.BALANCE.btnClose.addEventListener("click", closeInterface);

        controllerInputs.groups.NEW_CARD.btnAdd.addEventListener("click", this.newCard);
        controllerInputs.groups.BALANCE.btnAdd.addEventListener("click", ()=>{
            controllerBalance.updateValue();
            const balance = {
                currentValue: controllerBalance.currentValue
            }
            this.send(balance,"balance", "update");
        });

        controllerInputs.groups.NEW_CARD.buttons.optionA.addEventListener("click", ()=>{ 
            controllerInputs.selectedType = "Cemig"
            controllerInputs.groups.NEW_CARD.buttons.optionA.style.border = "3px solid rgb(38, 134, 38)";
            controllerInputs.groups.NEW_CARD.buttons.optionA.style.borderRight = "none";
            controllerInputs.groups.NEW_CARD.buttons.optionB.style.border = "none";
        });
        controllerInputs.groups.NEW_CARD.buttons.optionB.addEventListener("click", ()=>{ 
            controllerInputs.selectedType = "Internet"
            controllerInputs.groups.NEW_CARD.buttons.optionB.style.border = "3px solid rgb(38, 134, 38)";
            controllerInputs.groups.NEW_CARD.buttons.optionB.style.borderLeft = "none";
            controllerInputs.groups.NEW_CARD.buttons.optionA.style.border = "none";
        });
    },

    get(route) {
        const config = {
            url: `/${route}`,
            method: "GET"
        }

        return axios(config);
    },

    send(data, route, option){
        const config = {
            url: `/${route}`,
            method: "POST",
            data: {
                option: option,
                data: data
            }
        }
        axios(config);
    },

    /**
     * Converte a data para o formato brasileiro.
     * @param {string} date 
     */
    convertDate(date) {
        if(date.includes("-")){
            const newDate = date.split("-");

            return `Vencimento: ${newDate[2]}/${newDate[1]}/${newDate[0]}`
        }

        return `Vencimento: ${date}`;
    },

    /**
     * Criar cards e retorna o seu objeto
     * @param {number} id 
     * @param {number} number 
     * @param {string} date 
     * @param {string} type 
     * @returns { {id: number, type: string, newDate: string, value: string} }
     */
    factoryCards(id, number, date, type) {
        var convertedDate = this.convertDate(date);
        const convertedNumber = parseFloat(number);
        const convertedValue = convertedNumber.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});

        const card = {
            id: id,
            newDate: convertedDate,
            value: `Valor: ${convertedValue}`,
            type: type
        }

        // Envia para o servidor
        if(this.requestedData){
            this.send(card, "bills", "insert");
        }

        return card;
    },

    /**
     * Insere no primeiro elemento todos os elementos seguintes
     * @param {Array} elements 
     * @returns {HTMLElement}
     */
     appendElements(elements){
        const firstElement = elements.shift();
        
        // Inserindo elementos no elemento HTML pai
        for(let element of elements){
            firstElement.appendChild(element);
        }

        return firstElement;
    },

    /**
     * Cria o elemento HTML e o retorna.
     * @param {Array} elementList 
     * @returns 
     */
    createElement(elementList, id=null) {
        const elements = new Array();
        for(let element of elementList){
            const newElement = document.createElement(element.elementName);
            
            if(element.category){
                newElement.classList.add(element.category);
            }
    
            if(element.content){
                newElement.innerText = element.content;
            }
    
            elements.push(newElement);
        }
    
        return this.appendElements(elements);
    },

    /**
     * Cria um cardElement contendo id, elemento e o tipo de card.
     * @param {string} value 
     * @param {string} date 
     * @param {string} type 
     * @param {number} id 
     * @returns {{ id: number, div: HTMLElement, type: string}}
     */
    factoryElement(value, date, type, id=undefined) {
        const selectedId = id || controllerCards.lastId
        const newCard = this.factoryCards(selectedId, value, date, type);
    
        const divCard = this.createElement([
            {
                elementName: "div",
                category: "contas",
                content: undefined
            },
            {
                elementName: "h3",
                category: undefined,
                content: `Conta ${newCard.type}`
            },
            {
                elementName: "p",
                category: undefined,
                content: newCard.value
            },
            {
                elementName: "p",
                category: undefined,
                content: newCard.newDate
            },
            {
                elementName: "button",
                category: undefined,
                content: "Confirmar Pagamento"
            },
        ]);
    
        const cardElement = {
            id: selectedId,
            div: divCard,
            type: type,
        }
    
        return cardElement;
    },

    newCard() {
        if(controllerInputs.validateInput(controller.selectedInterface)){
            const values = controllerInputs.getValues(controller.selectedInterface);
            const newCard = controllers.factoryElement(values[0], values[1], values[2]);
            controllerCards.insertCard(newCard);
            controllerInputs.clearInputs(controller.selectedInterface);
            closeInterface();
        }
        else{
            alert("Preencha todos os campos para adicionar a nova conta");
        }
    },

    load() {
        this.get("bills").then((value) => {
            const dataCards = value.data;
            if(dataCards.length > 0){
                for(let dataCard of dataCards){
                    const newCard = this.factoryElement(dataCard.value, dataCard.dueDate, dataCard.type, dataCard.id);
                    controllerCards.insertCard(newCard);
                }
                
                controllerCards.lastId = dataCards[dataCards.length-1].id+1;
            }

            this.requestedData = true;
        });

        this.get("balance").then((value) => {
            const dataBalance = value.data;
            controllerBalance.updateBalance(dataBalance.currentValue);
            controllerBalance.currentValue = dataBalance.currentValue;
        });
        
    },
    
    init() {
        this.setListenners();
        this.load();
    }
}

controllers.init();