import React, { Component } from 'react';
import logo from '../images/WOOLK.png';
import {Link} from 'react-router-dom'

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
        localStorage.removeItem('idReunionActuelle')
        window.location = "/Affichereunion";
    }
    creerReunion = event => {
        window.location = "/creerReunion";
    }
    buttonConnect = test => {
        if (test === true) {
            return (

                <div>
                    <Navbar  expand="md" className="link-navbar">
                        <Link to={localStorage.getItem("username")!=null ? "/Dashboard" :"/"}>
                        <img src={logo} className="logo-wook"/>
                        </Link>
                     {/**<NavbarBrand href="#" onClick={this.dashboard}>Home</NavbarBrand> */}   
                        {/* <NavbarToggler onClick={toggle} />  */}
                         <Collapse navbar>


                           <h3 className="text-navb"> <NavbarBrand  href="#" onClick={this.reunions}>Mes Reunions</NavbarBrand></h3>
                           <h3 className="text-navb"><NavbarBrand href="#" onClick={this.affichereunion}>Afficher ma réunion</NavbarBrand></h3>

                           <h3 className="text-navb"><NavbarBrand href="#" onClick={this.disconnect}>Se déconnecter</NavbarBrand></h3>


                            
                            
                            


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
                    <Navbar  expand="md" className="link-navbar">
                        <Link to="/">
                         <img src={logo} className="logo-wook"/>
                         </Link>
                       {/* *<NavbarBrand href="#" onClick={this.home }>Home</NavbarBrand> */} 
                        {/* <NavbarToggler onClick={toggle} /> */}
                         <Collapse navbar>
                            <Nav className="ml-auto" navbar>
                            </Nav>



                           <h3 className="text-navb"><NavbarBrand href="#" onClick={this.Speech}>Speech</NavbarBrand></h3>
                           <h3 className="text-navb"><NavbarBrand href="#" onClick={this.connect}>Connexion</NavbarBrand></h3> 

                            {/* <NavbarBrand href="#" onClick={this.inscription}>S'inscrire</NavbarBrand>  */}
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