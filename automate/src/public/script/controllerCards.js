const controllerCards = {
    types: {
        CEMIG: "Cemig",
        INTERNET: "Internet"
    },
    elementList: {
        cemig: document.querySelector(".cemig"),
        internet: document.querySelector(".internet")
    },

    lastId: 0,
    cemigCards: new Array(),
    internetCards: new Array(),

    scrollList(type) {
        if(type == this.types.CEMIG){
            this.elementList.cemig.scrollTo({left: this.elementList.cemig.scrollWidth});
        }
    },

    /**
     *  Insere um card no HTML.
     * @param { {id: number, div: HTMLElement, type: string} } card 
     */
    insertElement(card){
        if(card.type == this.types.CEMIG){
            this.elementList.cemig.appendChild(card.div);
        }
        else{
            this.elementList.internet.appendChild(card.div);
        }
    },

    /**
     *  Insere um card na lista.
     * @param { {id: number, div: HTMLElement, type: string} } card 
     */
     insertCard(card){
        if(card.type == this.types.CEMIG){
            if(this.verifyEmpty(card.type)){
                // Remove o card que contém a mensagem "Sem Contas"
                this.removeElement(card.type, this.elementList.cemig.children[0]);
            }
            this.cemigCards.push(card);
        }
        else{
            if(this.verifyEmpty(card.type)){
                // Remove o card que contém a mensagem "Sem Contas"
                this.removeElement(card.type, this.elementList.internet.children[0]);
            }
            this.internetCards.push(card);
        }

        card.div.children[3].addEventListener("click", ()=>{ this.removeCard(card.type, card.id)});
        
        this.insertElement(card);

        setTimeout(()=>{this.scrollList(card.type)}, 1000);

        this.lastId++;
    },

    /**
     * Cria o card de mensagem "Sem Contas".
     * @returns {HTMLElement}
     */
    createNoBill(){
        const billElement = document.createElement("div");
        billElement.classList.add("contas");

        const text = document.createElement("h2");
        text.innerText = "Sem Contas";

        billElement.appendChild(text);
        return billElement;
    },

    /**
     * Remover elemento do HTML
     * @param {string} type 
     * @param {HTMLElement} element 
     */
    removeElement(type, element){
        if(type == this.types.CEMIG){
            this.elementList.cemig.removeChild(element);
        }
        else{
            this.elementList.internet.removeChild(element);
        }
    },

    /**
     * Remove o elemento da lista selecionada
     * @param {number} indextToRemove index de inicialização
     * @param {Array} list lista que o card será removido
     */
    removeToList(indexToRemove, list){
        for(let index=indexToRemove; index<list.length; index++){
            list[index] = list[index+1];
        }

        // removendo ultimo item da lista
        list.pop();
    },

    /**
     * Remove o card da lista
     * @param {string} type
     * @param {number} id 
     */
    removeCard(type, id){
        var indexToRemove;
        console.log("REMOVER: ", id);
        if(type == this.types.CEMIG){
            indexToRemove = this.cemigCards.findIndex((card => card.id == id));
            const valueToDebit = this.cemigCards[indexToRemove].div.children[1].innerText.slice(7);
            controllerBalance.debitAccount(valueToDebit);
            this.removeElement(type, this.cemigCards[indexToRemove].div);
            this.removeToList(indexToRemove, this.cemigCards);
        }
        else{
            indexToRemove = this.internetCards.findIndex((card => card.id == id));
            const valueToDebit = this.internetCards[indexToRemove].div.children[1].innerText.slice(7);
            controllerBalance.debitAccount(valueToDebit);
            this.removeElement(type, this.internetCards[indexToRemove].div);
            this.removeToList(indexToRemove, this.internetCards);
        }

        controllers.send(id, "bills", "remove");
        console.log("SOLICITOU REMOçAO")
        if(this.verifyEmpty(type)){
            const card = {
                id: null,
                div: this.createNoBill(),
                type: type
            }

            this.insertElement(card);
        }
    },

    /**
     * Verifica se a lista correspondente ao tipo está vazia.
     * @param {string} type Tipo da lista que sera verificada
     * Cemig: Lista de contas da cemig
     * Internet: Lista de contas de internet
     * @returns {boolean} Verdadeiro se estiver vazio e falso se não estiver.
     */
    verifyEmpty(type) {
        if(type == this.types.CEMIG){
            if(this.cemigCards.length == 0)
                return true;
        }
        else{
            if(this.internetCards.length == 0)
                return true;
        }

        return false;
    }
}