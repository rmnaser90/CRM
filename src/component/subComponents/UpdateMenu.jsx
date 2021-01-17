import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, InputLabel, NativeSelect, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';


const UpdateMenu = inject("clientsStore","inputsStore")(observer(({ clientsStore,inputsStore, setShouldUpdateShow }) => {
    const{firstName,surName,country,email,employeeId} = inputsStore.updateMenuInputs

    const handleUpdate= function({target}){
        const {name,value}= target
        inputsStore.handleInputs("updateMenuInputs",name,value)
    }
    const submitChange = async function () {
        await clientsStore.updateClientInfo(inputsStore.updateMenuInputs)
        inputsStore.emptyInputs("updateMenuInputs")
        setShouldUpdateShow(false)
    }
    return (
        <form className="updateMenu" noValidate autoComplete="off">
            <Typography className="inputs" variant="h3">
                Update Client
          </Typography>
            <TextField onChange={handleUpdate} label="First Name" value={firstName} name="firstName" variant="outlined"/>
            <TextField onChange={handleUpdate} label="Last Name" value={surName} name="surName" variant="outlined" />
            <TextField onChange={handleUpdate} label="Country" value={country} name="country" variant="outlined" />
            <TextField onChange={handleUpdate} label="email" value={email} name="email" variant="outlined" />
            <FormControl className="select">
                <InputLabel>Owner</InputLabel>
                <NativeSelect onChange={handleUpdate} value={employeeId} name="employeeId">
                    <option aria-label="None" value="" />
                    {clientsStore.employees.map(e => <option key={e.id} value={e.id}>{e.employeeFirstName} {e.employeeSurName}</option>)}
                </NativeSelect>
            </FormControl>
            <Button onClick={submitChange}> Submit</Button>
        </form>
    );
}))

export default UpdateMenu
