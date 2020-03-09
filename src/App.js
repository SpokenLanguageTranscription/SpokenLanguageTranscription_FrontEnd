import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'

import CreerCompte from './Pages/CreerCompte';
import Connexion from './Pages/Connexion';
import RecupPass from './Pages/RecupPass';
import Accueil from './Pages/Accueil';
import NavBar from './Composants/NavBar';


function App() {
  return (
    <>
      
   {/**<NavBar />  */} 
     <Switch>

     <Route exact path="/CreerCompte"  component={CreerCompte}/>
     <Route exact path="/Connexion"  component={Connexion}/>
     <Route exact path="/RecupPass"  component={RecupPass}/>

     <Route exact path="/" component={Accueil} />


     </Switch>

    </>
  );
}

export default App;
