import  React, { Component } from 'react';
import '../Appp.css';
import API from "./API";
import { Collapse, Navbar,NavbarText,div, NavbarToggler, NavbarBrand, Nav, NavItem,
 UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';

 export default class Header extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {

        return (
            
<div className="himage">            
<div className="head">
<h1>WOOLK</h1>
  <center><h3><p>Solution d'accessibilité innovante pour tous les sourds et malentendants </p></h3></center> 


</div>

</div>

        );
    }


}