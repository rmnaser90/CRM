import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';

const EmployeeSalesChart = inject("clientsStore")(observer(({ clientsStore }) => {

    return (
        <div className="employeeSalesChart chartContainer">

        <Typography variant='h5'>Sales By Employee</Typography>
        <ResponsiveContainer  width='80%' height={300} >
        <BarChart data={clientsStore.employeesSalesArray}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="firstName" fontSize="1.5vw"/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#003049" />
        </BarChart>
        </ResponsiveContainer>
            </div>
    )
}))

export default EmployeeSalesChart
