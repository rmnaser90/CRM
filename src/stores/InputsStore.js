import { observable, makeObservable, action } from 'mobx'
export default class InputsStore {
    constructor() {
        this.updateMenuInputs = {
            id: undefined,
            firstName: "",
            surName: "",
            country: "",
            email: "",
            employeeId: undefined,
            sold: undefined
        }
        this.actionsUpdate = {
            clientSearch: '',
            employeeId: undefined,
            emailType: "",
            sold: undefined
        }
        this.selectedClient = {}


        makeObservable(this, {
            updateMenuInputs: observable,
            actionsUpdate: observable,
            selectedClient: observable,
            handleInputs: action,
            emptyInputs: action,
            handleClientSearch: action

        })
    }

    handleClientSearch(value, selectedClient) {
        this.clientSearch = value
        this.selectedClient = selectedClient
    }
    handleInputs(form, property, value) {
        this[form][property] = value
    }
    emptyInputs(form) {
        for (const key in this[form]) {
            this[form][key] = ""
        }
    }

}