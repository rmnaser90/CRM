import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CountrySalesChart = inject("clientsStore")(observer(({ clientsStore }) => {

    return (
        <div className="employeeSalesChart chartContainer">

            <Typography className="chartTitle" variant='h5'>Sales By Country</Typography>
            <ResponsiveContainer width='80%' height={300} >

                <BarChart width={800} height={300} data={clientsStore.countrySalesArray}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" scale="auto" fontSize="1.5vw" type="category" width="50%"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#003049" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}))

export default CountrySalesChart
