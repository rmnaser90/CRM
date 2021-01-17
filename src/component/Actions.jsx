import React from 'react';
import { inject, observer } from 'mobx-react';
import NewClient from './subComponents/NewClient';
import UpdateClientActions from './subComponents/UpdateClientActions';
import SelectedClient from './subComponents/SelectedClient';


const Actions = inject("clientsStore","inputsStore")(observer(({ clientsStore,inputsStore}) => {

    return (
        <div className="actions">
          
            <UpdateClientActions/>
            <SelectedClient/>
            <NewClient/>
            

        </div>
        
    );
}))

export default Actions
