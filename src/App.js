import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'

import CreerCompte from './Pages/CreerCompte';

function App() {
  return (
    <>
      
     <Switch>

     <Route exact path="/CreerCompte"  component={CreerCompte}/>

     </Switch>

    </>
  );
}

export default App;
