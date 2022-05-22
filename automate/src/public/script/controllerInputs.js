const controllerInputs = {
    groups: {
        NEW_CARD: {
            inputs: [
                document.querySelector("#valueNumber"),
                document.querySelector("#valueDate")
            ],
            buttons: {
                optionA: document.querySelector("#cemig"),
                optionB: document.querySelector("#internet")
            },
            btnClose: document.querySelector(".fechar button"),
            btnAdd: document.querySelector("#addCard")
        },
        BALANCE: {
            inputs: [
                document.querySelector("#valueBalance")
            ],
            buttons: null,
            btnClose: document.querySelector("#closeBalance"),
            btnAdd: document.querySelector("#updateBalance")
        }
    },

    selectedType: "",

    /**
     * Limpa todos os inputs do grupo selecionado
     * @param {string} group Valores
     * NEW_ACCOUNT: Tela responsável por adicionar novas contas
     */
    clearInputs(group) {
        for(let index=0; index<this.groups[group].inputs.length; index++){
            this.groups[group].inputs[index].value = "";
        }

        if(this.groups[group].buttons != null){
            this.groups[group].buttons.optionA.style.border = "none";
            this.groups[group].buttons.optionB.style.border = "none";
        }

        this.selectedType = "";
    },

    /**
     * Pega todos os valores dos inputs do grupo selecionado
     * @param {string} group Valores
     * NEW_ACCOUNT: Tela responsável por adicionar novas contas
     * 
     * @returns {Array}
     */
    getValues(group) {
        const values = new Array();
        const groupUpperCase = group.toUpperCase();
        
        for(let index=0; index<this.groups[groupUpperCase].inputs.length; index++){
            values.push(this.groups[groupUpperCase].inputs[index].value);
        }

        // Se existir algum tipo selecionado, adicione-o na lista de valores
        if(this.selectedType.length>0)
            values.push(this.selectedType);

        return values;
    },

    /**
     * Verifica se algum input está vazio
     * @param {string} group Nome da interface
     * NEW_ACCOUNT: Tela responsável por adicionar novas contas
     * 
     * @returns {boolean}
     */
    validateInput(group) {
        const values = this.getValues(group);
        for(let index=0; index<values.length; index++){
            if(values[index].length==0){
                return false;
            }
        }

        if(this.groups[group].buttons && this.selectedType.length == 0)
            return false;
            

        return true;
    }
}