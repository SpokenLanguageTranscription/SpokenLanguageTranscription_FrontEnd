import React, { Component } from 'react';

import API from "./API";
import { Collapse, Navbar,NavbarText,div, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';


export default class Footer extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {

        return (
            <div className="footer">
            <footer>
            <h3>SpokenLanguageTranscript by WOOLK</h3>
            <p >© Copyright 2020 WOOLK. All rights reserved.</p>
            
            <ul>
             
              <li><a href="#" class="fa fa-facebook"></a></li>
              <li><a href="#" class="fa fa-twitter"></a></li>
              <li><a href="#" class="fa fa-google"></a></li>
            </ul>
        </footer>
        </div>

        );
    }


}