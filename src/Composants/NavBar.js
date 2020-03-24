import React, { Component } from 'react';

import API from "./API";
import { Collapse, Navbar,NavbarText,div, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';


export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.disconnect.bind(this);
    }

    disconnect = event => {
        API.logout();
        window.location = "/";
    }


    Speech = event => {

        window.location = "/Speech";

    }

    dashboard = event => {

        window.location = "/Dashboard";

    }
    home = event => {

        window.location = "/Dashboard";

    }

    connect = event => {

        window.location = "/connexion";

    }

    inscription= event => {

        window.location = "/inscription";

    }
    reunions = event => {
        window.location = "/reunion";
    }
    affichereunion = event => {
        window.location = "/Affichereunion";
    }
    creerReunion = event => {
        window.location = "/creerReunion";
    }
    buttonConnect = test => {
        if (test === true) {
            return (

                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="#" onClick={this.dashboard}>Home</NavbarBrand>
                        {/* <NavbarToggler onClick={toggle} />  */}
                        <Collapse navbar>
                            <NavbarBrand href="#" onClick={this.reunions}>Mes Reunions</NavbarBrand>
                                <NavbarBrand href="#" onClick={this.affichereunion}>Afficher ma réunion</NavbarBrand>
                            <NavbarBrand href="#" onClick={this.creerReunion}>créer une réunion</NavbarBrand>

                            <NavbarBrand href="#" onClick={this.disconnect}>Se déconnecter</NavbarBrand>
                        </Collapse>
                    </Navbar>
                </div>)
        }
          else{

            return (
                /*     <nav className="navbar navbar-default">
                       <div className= "container-fluid" >
                           <div className= "navbar-header" ><a className = "navbar-brand" href = "#" >  </a> </div>
                           <ul className = "nav navbar-nav" >
                               <li className = "active" > <a href = "#" onClick={this.connect} > Home </a></li >
                               <li className="buttonTop" right>          <a className="buttonTop1"
                                   onClick={this.document}
                                   href ="#"
                               >
                                   Gestion de Contenu
                               </a>
                               </li>
                               <li className="buttonTop">          <a className="buttonTop1"
                                   onClick={this.inscription}
                                   href="#"
                               >
                                   s'inscrire
                               </a>
                               </li>
                           </ul>
                       </div>
                   </nav> */

                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="#" onClick={this.home }>Home</NavbarBrand>
                        {/* <NavbarToggler onClick={toggle} /> */}
                        <Collapse navbar>
                            <Nav className="ml-auto" navbar>
                            </Nav>
                            <NavbarBrand href="#" onClick={this.Speech}>Speech</NavbarBrand>
                            <NavbarBrand href="#" onClick={this.connect}>Connexion</NavbarBrand>
                           {/* <NavbarBrand href="#" onClick={this.inscription}>S'inscrire</NavbarBrand> */} 
                        </Collapse>
                    </Navbar>
                </div>
                 


            )

        }
    }
    render() {
        let x ;
        if(API.isAuth()){
            x= this.buttonConnect(true)
        }else{
            x= this.buttonConnect(false)
        }
        return (
            x

        );

    }}