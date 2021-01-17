import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, InputLabel, NativeSelect, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';


const NewClient = inject("clientsStore","inputsStore")(observer(({ clientsStore,inputsStore}) => {
    const{firstName,surName,country,email,employeeId} = inputsStore.updateMenuInputs

    const handleInput= function({target}){
        const {name,value}= target
        inputsStore.handleInputs("updateMenuInputs",name,value)
    }
    const submitNewClient = async function () {
        await clientsStore.addNewClient(inputsStore.updateMenuInputs)
        inputsStore.emptyInputs("updateMenuInputs")
    }
    return (

            
        <form className="newClient" noValidate autoComplete="off">
            <Typography className="inputs" variant="h4">
                Add new client
          </Typography>
            <TextField onChange={handleInput} label="First Name" value={firstName} name="firstName" variant="outlined"/>
            <TextField onChange={handleInput} label="Last Name" value={surName} name="surName" variant="outlined" />
            <TextField onChange={handleInput} label="Country" value={country} name="country" variant="outlined" />
            <TextField onChange={handleInput} label="Email" value={email} name="email" variant="outlined" />
            <FormControl className="select">
                <InputLabel>Owner</InputLabel>
                <NativeSelect onChange={handleInput} value={employeeId} name="employeeId">
                    <option aria-label="None" value="" />
                    {clientsStore.employees.map(e => <option key={e.id} value={e.id}>{e.employeeFirstName} {e.employeeSurName}</option>)}
                </NativeSelect>
            </FormControl>
            <Button onClick={submitNewClient}> Submit</Button>
        </form>
  
    );
}))

export default NewClient
