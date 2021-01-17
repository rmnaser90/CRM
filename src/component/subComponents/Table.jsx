import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { inject, observer } from 'mobx-react';
import UpdateMenu from './UpdateMenu';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'fullName',
        headerName: 'Full name',
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.surName || ''}`,
    },
    { field: 'country', headerName: 'Country', width: 130 },
    {
        field: 'date', headerName: 'First contact', width: 160,
        valueGetter: (params) =>
            `${new Date(params.row.firsContactDate).toLocaleDateString()}`
    }, { field: 'email', headerName: 'Email', width: 250 },
    {
        field: 'email-type', headerName: 'Email Type', width: 160,
        valueGetter: (params) =>
            `${params.row.emailType === 'null' ? '-' : params.row.emailType}`
    }, {
        field: 'employeeFullName',
        headerName: 'Owner',
        width: 160,
        valueGetter: (params) =>
            `${params.row.employeeFirstName || ''} ${params.row.employeeSurName || ''}`,
    }
    , {
        field: 'Sold', headerName: 'Sold', width: 130,
        valueGetter: (params) =>
            `${params.row.sold ? '✓' : '-'}`
    }


];


const Table = inject("clientsStore","inputsStore")(observer(function ({inputsStore, clientsStore }) {
    const [shouldUpdateShow, setShouldUpdateShow] = useState(false)
    const handleRowClick = (e) => {
        inputsStore.emptyInputs("updateMenuInputs")
        inputsStore.handleInputs("updateMenuInputs","id",e.row.id)
        setShouldUpdateShow(true)
    }
    const hideUpdateMenu = () => {
        inputsStore.emptyInputs("updateMenuInputs")
        setShouldUpdateShow(false)
    }
    return (
        <div className="tableContainer">
            {shouldUpdateShow && <span>
                <div className="updateMenuContainer" onClick={hideUpdateMenu}></div>
                <UpdateMenu setShouldUpdateShow={setShouldUpdateShow}/>
            </span>}
            <DataGrid className="dataGrid" onRowClick={handleRowClick} rows={clientsStore.clients} columns={columns} pageSize={15} />
        </div>
    );
}))

export default Table