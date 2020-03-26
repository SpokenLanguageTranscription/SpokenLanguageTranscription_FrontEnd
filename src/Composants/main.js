import  React, { Component } from 'react';
import '../Appp.css';
import API from "./API";
import { Collapse, Navbar,NavbarText,div, NavbarToggler, NavbarBrand, Nav, NavItem,
 UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';

 export default class main extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {

        return (            
            <div className="main">
            <div className="tel"> 
            
            </div>
            <div className="contenttel">
                 <center> <h5>WOOLK connecte famille, amis et collègues.
                  <br></br> Outil de gestion de réunions pour malentendants.
                  <br></br>Chacun se connecte à WOOLK via l'API Seech Recognition, <br></br>
                   WOOLK transcrit tout pour ne rien manquer d'une conversation</h5>
                   </center>
            </div>  

            </div>

        );
    }


}