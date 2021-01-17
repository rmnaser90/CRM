const axios = require('axios')

class ApiManager {
    constructor() {
        this.url = 'http://localhost:3001/'
    }
   
    async getData(data) {
        const response =await axios.get(`${this.url}${data}`)
        return response.data
    }
    async postClient(client) {
        return await axios.post(`${this.url}client`, client)
    }
    async updateClientInfo(newInfo){
        return await axios.put(`${this.url}client/${newInfo.id}`, newInfo)
    }
    async sendEmail( clientEmail, employeeId, type ){
        return await axios.post(`${this.url}email`, {clientEmail, employeeId, type})
    }
    async makeSale(clientId,employeeId){
        return await axios.post(`${this.url}sale`,{clientId,employeeId})
    }
  
}
export default ApiManager