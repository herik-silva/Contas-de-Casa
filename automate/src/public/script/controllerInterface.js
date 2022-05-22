/**
 * Retorna um objeto de interface
 * @param { string } selector 
 * @param { Boolean } isActive 
 * @returns 
 */
function factoryNodeInterface(selector, isActive = false) {
    return {
        //-----------------Atributos-----------------
        element: document.querySelector(selector), // Elemento HTML
        isActive: isActive, // Situação (Exibindo: True / Escondido: False)

        //------------------Métodos------------------

        /**
         * Mostra a interface na tela
         */
        show() {
            this.element.style.display = "flex";
            this.isActive = true;
        },

        /**
         * Oculta a interface da tela
         */
        close() {
            this.element.style.display = "none";
            this.isActive = false;
        }
    }
}

const controller = {
    selectedInterface: "DEFAULT",
    interfaces: {
        NEW_CARD: factoryNodeInterface(".novo-card-bg"),
        BALANCE: factoryNodeInterface(".atualizar-saldo-bg")
    }
}

function closeInterface() {
    if(controller.interfaces[controller.selectedInterface].isActive){
        controller.interfaces[controller.selectedInterface].close();
        controller.selectedInterface = "DEFAULT";
    }
}

function showInterface(interfaceName) {
    const selectedInterface = controller.interfaces[interfaceName];

    if(selectedInterface && !controller.isActive){
        selectedInterface.show();
        controller.selectedInterface = interfaceName;
    }
}