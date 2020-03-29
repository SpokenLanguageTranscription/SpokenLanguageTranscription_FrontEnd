import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import NotificationAlert from 'react-notification-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-notification-alert/dist/animate.css";
import PropTypes from 'prop-types'
import Header from '../Composants/header';
import Main from '../Composants/main';
import '../App.css';
import '../Appp.css'
import { Container, Row, Col } from 'reactstrap';

import HAccueil from '../Composants/HAccueil';
import BAccueil from '../Composants/BAccueil';

import {FaFacebookSquare} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaTwitterSquare} from 'react-icons/fa';

  
var options1 = {};
var options2 = {};
options1 = {
    place: 'tc',
    message: (
        <div>
            <div>
                {localStorage.getItem("success")}
            </div>
        </div>
    ),
    type: "success",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 4
}
options2 = {
    place: 'tc',
    message: (
        <div>
            <div>
                {localStorage.getItem("error")}
            </div>
        </div>
    ),
    type: "danger",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 4
}
export default class Accueil extends Component {

    constructor() {
        super()
        this.state = {
            
        }


    }

    componentDidMount() {
        if(localStorage.getItem('success')!= null) this.refs.notify.notificationAlert(options1);
        if(localStorage.getItem('error')!= null) this.refs.notify.notificationAlert(options2);
    }
    componentDidUpdate() {
        localStorage.removeItem('success')
        localStorage.removeItem('error')
    }
    render () {
        return (
            <div className="hac">
    
               <HAccueil>
                   
                   <div className="deux-banner">
                       <BAccueil title="- W O O L K -"
                                 subtitle="Solution d'accessibilité innovante pour tous les sourds et malentendants">
                     
                     <small className="p-woolk">WOOLK connecte famille, amis et collègues.
                       Outil de gestion de réunions pour malentendants.
                       Chacun se connecte à WOOLK via l'API Seech Recognition,
                    WOOLK transcrit tout pour ne rien manquer d'une conversation</small>

                    <div> <FaFacebookSquare/>  <FaInstagram/>  <FaTwitterSquare/> </div>
                       </BAccueil>

                       

                      
                   </div>

                   


               </HAccueil>

            {/* <NotificationAlert ref="notify" />
            <Container className="maBox">
             <Header/>
            
            <Main/> 
            </Container> */}
            </div>
           

                  )
    }
    
}
