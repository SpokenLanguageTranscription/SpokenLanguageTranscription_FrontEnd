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
            <div>

            <NotificationAlert ref="notify" />
            <Container className="maBox">
             <Header/>
            
            <Main/> 
            </Container>
            </div>
           

                  )
    }
    
}
