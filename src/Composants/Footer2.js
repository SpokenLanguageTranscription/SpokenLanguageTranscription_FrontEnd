import React, { Component } from 'react';
import logo from '../images/WOOLK.png';
import {Link} from 'react-router-dom'

import API from "./API";
import { Collapse, Navbar,NavbarText,div, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';


export default class Footer2 extends React.Component {

    constructor(props) {
        super(props);
        
    }

    
    render() {
        return(

            <div className="footer2">
                    <Navbar  expand="md" className="link-navbar">
                      
                          <small>© Copyright 2020 WOOLK. All rights reserved.</small>
                       
                    

                    
                         
                         
                    </Navbar>
            </div>)
        

    }}