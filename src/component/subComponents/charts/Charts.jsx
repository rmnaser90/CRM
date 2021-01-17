import React from 'react'
import CountrySalesChart from './CountrySalesChart'
import EmployeeSalesChart from './EmployeeSalesChart'

const Charts = () => {
    return (
        <div className="chartsContainer">
            <EmployeeSalesChart/>
            <CountrySalesChart/>
        </div>
    )
}

export default Charts
