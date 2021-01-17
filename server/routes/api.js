const express = require('express')
const router = express.Router()
const SQLManager = require('../sql/SQLManager')
const sqlManager = new SQLManager

router.get('/clients', async function (req, res) {
    try {
        const clients = await sqlManager.getClientsData()
        res.status(200).send(clients)
    } catch (error) {
        res.status(401).send(error)
    }
})
router.get('/employees', async function (req, res) {
    try {
        const employees = await sqlManager.getEmployees()
        res.status(200).send(employees)
    } catch (error) {
        res.status(401).send(error)
    }
})
router.get('/sales', async function (req, res) {
    try {
        const sales = await sqlManager.getSales()
        res.status(200).send(sales)
    } catch (error) {
        res.status(401).send(error)
    }
})
router.get('/emails', async function (req, res) {
    try {
        const emails = await sqlManager.getEmails()
        res.status(200).send(emails)
    } catch (error) {
        res.status(401).send(error)
    }
})
router.get('/client/:clientEmail', async function (req, res) {
    const { clientEmail } = req.params
    try {
        const client = await sqlManager.getClient(clientEmail)
        res.status(200).send(client)
    } catch (error) {
        res.status(401).send(error)
    }
})

router.post('/client', async function (req, res) {
    const client = req.body
    const response = await sqlManager.addClient(client)
    console.log(response);
    res.send({ response })
})

router.post('/sale', async function (req, res) {
    const { clientId, employeeId } = req.body
    try {
        const response = await sqlManager.addSale(clientId, employeeId)
        res.send({ response })
    } catch (error) {
        res.send({ error })
    }
})
router.post('/email', async function (req, res) {
    const { clientEmail, employeeId, type } = req.body
    console.log(req.body);
    try {
        const response = await sqlManager.sendEmail(clientEmail, employeeId, type)
        res.send({ response })
    } catch (error) {
        res.send({ error })
    }
})
router.put('/client/:clientId', async function (req, res) {
const {clientId} = req.params
const newInfo = req.body
const response = await sqlManager.updateClient(clientId,newInfo)
res.send({response})

})





module.exports = router
