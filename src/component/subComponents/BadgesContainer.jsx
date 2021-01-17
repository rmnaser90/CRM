import Badge from './Badge'
import React from 'react'
import { inject, observer } from 'mobx-react'
import emailIcon from './badgeIcons/email.png'
import clientIcon from './badgeIcons/clients.png'
import newClientIcon from './badgeIcons/newClients.png'
import globe from './badgeIcons/globe.png'

const BadgesContainer = inject("clientsStore")(observer(({clientsStore}) => {
    let hottestCountry = Object.keys(clientsStore.countries)[0]
    Object.keys(clientsStore.countries).forEach(c =>{
        if (clientsStore.countries[c]>clientsStore.countries[hottestCountry]) {
            hottestCountry = c
        }
    })
    const monthIndex = new Date().getMonth()
    const currentMonth = clientsStore.months[monthIndex]
    const currentYear = new Date().getFullYear()
    const firstDayOfMonth = Date.parse(new Date(`1/${monthIndex+1}/${currentYear}`))
    let numNewClients = 0
    clientsStore.clients.forEach(c =>{
        if (c.firsContactDate > firstDayOfMonth) {
            numNewClients++
        }
    })


    return (
        <div className="badgeContainer">
            <Badge name={`New ${currentMonth} clients`} num={numNewClients} icon={newClientIcon}/>
            <Badge name="Sent emails" num={clientsStore.numberOfEmails} icon={emailIcon}/>
            <Badge name="Outstanding Clients" num={clientsStore.outstandingClients} icon={clientIcon} />
            <Badge name="Hottest Country"  num={hottestCountry} icon={globe}/>
        </div>
    )
}))

export default BadgesContainer
