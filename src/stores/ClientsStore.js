import { observable, makeObservable, action, computed, runInAction } from 'mobx'
import ApiManager from '../utilities/ApiManager'
const apiManager = new ApiManager()

export default class ClientsStore {
    constructor() {
        this.clients = []
        this.employees = []
        this.sales = []
        this.emails = []
        this.outstandingClients = 0
        this.countries = {}
        this.employeesSales = {}
        this.emailTypes = {}
        this.months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        makeObservable(this, {
            clients: observable,
            employees: observable,
            sales: observable,
            outstandingClients: observable,
            countries: observable,
            emailTypes: observable,
            emails: observable,
            updateClients: action,
            updateClientInfo: action,
            updateEmployees: action,
            updateEmails:action,
            updateSales: action,
            addNewClient: action,
            sendEmail:action,
            makeSale: action,
            numberOfEmails:computed,
            employeesSalesArray:computed,
            countrySalesArray:computed
        })
        this.updateClients()
        this.updateEmployees()
        this.updateSales()
        this.updateEmails()
    }

    get numberOfEmails(){
        return this.emails.length
    }
    get employeesSalesArray(){
        const arr = Object.keys(this.employeesSales).map(e => {
            return{firstName: this.employeesSales[e].firstName, sales: this.employeesSales[e].sales}
        })
        return arr
    }
    get countrySalesArray(){
        const arr = Object.keys(this.countries).map(c =>{
            return{name: c, sales: this.countries[c]}
        })
        return arr
    }

    updateClients = async () => {
        const clients = await apiManager.getData("clients")
        runInAction(()=>{
        this.outstandingClients = 0
        clients.forEach(c => {
            if (!c.sold) { this.outstandingClients++ }
            if (this.emailTypes[c.emailType]) {

                this.emailTypes[c.emailType]++
            } else {
                this.emailTypes[c.emailType] = 1
            }
        })

            this.clients = clients
        })
        return clients
    }
    updateEmployees = async () => {
        const employees = await apiManager.getData("employees")
        runInAction(()=>{
            this.employees = employees
        })
        return employees
    }
    updateSales = async () => {
        const sales = await apiManager.getData("sales")
        runInAction(()=>{
            this.employeesSales={}
            this.sales = sales
            sales.forEach(s => {
                if (this.countries[s.country]) {
                    this.countries[s.country]++
                } else {
                    this.countries[s.country] = 1
                }
                if (this.employeesSales[s.employeeId]) {
                    this.employeesSales[s.employeeId].sales++
                } else {
                    this.employeesSales[s.employeeId] = {
                        sales: 1,
                        firstName: s.employeeFirstName
                    }
                }
            })
        })
        return sales
    }
    updateEmails = async () => {
        const emails = await apiManager.getData("emails")
        runInAction(()=>{
            this.emails = emails
        })
        return emails
    }
    updateClientInfo = async (newInfo) => {
        const response = await apiManager.updateClientInfo(newInfo)
        await this.updateClients()
        return response
    }
    addNewClient = async (client) => {
        const response = await apiManager.postClient(client)
        await this.updateClients()
        return response
    }
    sendEmail = async (clientEmail, employeeId, type) => {
        const response = await apiManager.sendEmail(clientEmail, employeeId, type)
        await this.updateClients()
        await this.updateEmails()
        return response
    }
    makeSale = async (clientId, employeeId) => {
        const response = await apiManager.makeSale(clientId, employeeId)
        await this.updateClients()
        await this.updateSales()
        return response
    }

}