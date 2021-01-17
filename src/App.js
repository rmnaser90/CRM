import React from 'react'
import { inject, observer } from 'mobx-react'
import './App.css';
import NavBar from './component/NavBar';

const App = inject("clientsStore")(observer(function ({ clientsStore }) {
 
  return (
    <div className="mainContainer">
      <NavBar />
      
    </div>
  )
}))

export default App