const Sequelize = require('sequelize')
class SQLManager {
    constructor() {
        this.sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL)
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            })
    }
    async getCountry(countryName) {
        try {
            const [res, meta] = await this.sequelize.query(`
            SELECT * FROM country 
            WHERE countryName = "${countryName}";`)
            if (res.length) {
                return res[0]
            } else {
                return false
            }
        } catch (error) {
            return error;
        }
    }
    async addCountry(countryName) {
        const country = await this.getCountry(countryName)
        if (country) {
            return { message: "country already exists" }
        } else {

            try {
                const [res, meta] = await this.sequelize.query(`
                                        INSERT INTO country VALUES(NULL,"${countryName.toLowerCase()}")
                                        `)
                return res
            } catch (error) {
                return error;
            }
        }
    }
    async getEmployees(employeeName) {
        try {
            const [res, meta] = await this.sequelize.query(`
            SELECT * FROM employee 
            `)

            if (res.length) {
                return res
            } else {
                return false
            }

        } catch (error) {
            return error;
        }
    }
    async addEmployee(employeeName) {
        const employee = await this.getEmployee(employeeName)
        if (employee) {
            return { message: "employee already exists" }
        } else {
            const name = employeeName.split(' ')[0].toLowerCase()
            const surname = employeeName.split(' ')[1].toLowerCase()
            try {
                const [res, meta] = await this.sequelize.query(`
                INSERT INTO employee VALUES(NULL,"${name}","${surname}")
                `)
                return res
            } catch (error) {
                return error;
            }
        }
    }
    async getClient(clientEmail) {
        const query = `
        SELECT * FROM client 
        WHERE email = "${clientEmail}"`

        console.log(query);
        try {
            const [res, meta] = await this.sequelize.query(query)

            if (res.length) {
                return res[0]
            } else {
                return false
            }

        } catch (error) {
            return error;
        }
    }

    async addClient(client) {
        const { firstName, surName, email, employeeId, country } = client
        await this.addCountry(country)
        const { id: countryID } = await this.getCountry(country)
        const firsContactDate = Date.now()
        const sold = 0

        try {
            const [res, meta] = await this.sequelize.query(`
            INSERT INTO client (firstName,surName,email, firsContactDate,sold, countryId,employeeId)
            VALUES(
                "${firstName}",
                "${surName}",
                "${email}",
                ${firsContactDate},
                ${sold},
                ${countryID},
                ${employeeId}
            );`)

            await this.sendEmail(email, employeeId, null)
            return res

        } catch (error) {
            return error
        }
    }
    async updateClient(clientId, newInfo) {
        if (newInfo.country) {
            await this.addCountry(newInfo.country)
            var { id: countryID } = await this.getCountry(newInfo.country)
        }
        const [res, meta] = await this.sequelize.query(`
        UPDATE client
        SET 
        ${newInfo.firstName ? `firstName = "${newInfo.firstName}",` : ""}
        ${newInfo.surName ? `surName = "${newInfo.surName}",` : ""}
        ${newInfo.email ? `email = "${newInfo.email}",` : ""}
        ${newInfo.employeeId ? `employeeId = ${newInfo.employeeId},` : ""}
        ${newInfo.country ? `countryID = "${countryID}",` : ""}
        ${newInfo.sold !== undefined ? `sold = ${newInfo.sold},` : ""}
        lastUpdated = ${Date.now()}
        WHERE id = ${clientId};
        `)
    }
    async getClientsData() {
        try {
            const [res, meta] = await this.sequelize.query(`
              SELECT client.id,firstName,surName,
                  countryName AS country,firsContactDate,
                  email,type AS emailType,sold,
                  employee.id AS employeeId,
                  employeeFirstName,employeeSurName
              FROM client , country, emails, employee
              WHERE
                  client.countryId = country.id AND
                  client.employeeId = employee.id AND
                  emails.clientId = client.id
              ORDER BY client.firstName, client.surName;
              `)
            return res

        } catch (error) {
            console.log(error)
            return error
        }
    }
    async addSale(clientID, employeeID) {
        try {
            const [res, meta] = await this.sequelize.query(`
            INSERT INTO sales VALUES(NULL,${clientID},${employeeID},${Date.now()})
            `)
            this.updateClient(clientID, { sold: true })
            return res
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async sendEmail(clientEmail, employeeID, type) {
        const { id: clientID } = await this.getClient(clientEmail)
        console.log(clientID);
        try {
            const [res, meta] = await this.sequelize.query(`
            INSERT INTO emails VALUES(NULL,${clientID},${employeeID},"${type}",${Date.now()})
            `)
            return res
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async getSales() {
        try {
            const [res, meta] = await this.sequelize.query(`
            SELECT sales.id,
                firstName,surName, 
                client.id AS clientId,
                countryName AS country,
                employee.id AS employeeId,
                employeeFirstName,employeeSurName, sales.date As saleDate
            FROM sales,client,country,employee
            WHERE
                sales.clientId = client.id
                AND sales.employeeId = employee.id
                AND client.countryId = country.id
            ORDER By sales.date DESC;
              `)
            return res

        } catch (error) {
            console.log(error)
            return error
        }
    }
    async getEmails() {
        try {
            const [res, meta] = await this.sequelize.query(`
            SELECT * FROM emails 
            `)

            if (res.length) {
                return res
            } else {
                return false
            }

        } catch (error) {
            return error;
        }
    }
}
module.exports = SQLManager









