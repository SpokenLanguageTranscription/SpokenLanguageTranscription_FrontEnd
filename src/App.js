import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'

import CreerCompte from './Pages/CreerCompte';
import Connexion from './Pages/Connexion';
import Dashboard from './Pages/Dashboard';
import RecupPass from './Pages/RecupPass';
import Accueil from './Pages/Accueil';
import NavBar from './Composants/NavBar';
import Footer from './Composants/footer';

function App() {
  return (
      <div className="container-drag">

          <NavBar/>

          <Switch>
              <Route exact path="/CreerCompte"  component={CreerCompte}/>
              <Route exact path="/Connexion"  component={Connexion}/>
              <Route exact path="/RecupPass"  component={RecupPass}/>
              <Route exact path="/Dashboard"  component={Dashboard}/>
              <Route exact path="/" component={Accueil} />


          </Switch>
          <Footer/>
      </div>)




}

export default App;
