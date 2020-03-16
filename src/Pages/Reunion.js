import React, { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import   { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import NotificationAlert from 'react-notification-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-notification-alert/dist/animate.css";
import { Container, Row, Col } from 'reactstrap';
import "../App.css";
import API from "../Composants/API";




const CompteForm = (props) => {
    const {
        buttonLabel,
        className,onChangeIdReunion,idReunion,onChangeSujet,sujet,onChangeMail,email,send
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="info" className="elemBarreGauche"  onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Formulaire de création de réunion</ModalHeader>
                <ModalBody>
                    <div>
                        <Form>
                            <FormGroup>
                                <Label for="idReunion">ID Réunion</Label>
                                <Input type="text" name="idReunion" id="idReunion" placeholder="A23AZE" value={idReunion}
                                       onChange={onChangeIdReunion} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Sujet">Sujet de la réunion</Label>
                                <Input type="text" name="sujet" id="Sujet" placeholder="Le sujet principale de la réunison" value={sujet}
                                       onChange={onChangeSujet} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Email">Participants</Label>
                                <Input type="email" name="email" id="Email" placeholder="Steph@gmail.com;pascal@hotmail.com" value={email}
                                       onChange={onChangeMail} />
                            </FormGroup>


                        </Form></div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={send}>Enregistrer</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}


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



export default class Reunion extends Component {



    constructor() {
        super()
        this.state = {
            email :"",
            idReunion:"",
            sujet : "",
            createur :localStorage.getItem("email"),
        }



        this.onChangeMail = this.onChangeMail.bind(this)
        this.onChangeSujet = this.onChangeSujet.bind(this)
        this.onChangeIdReunion = this.onChangeIdReunion.bind(this)
        this.send = this.send.bind(this)
    }

    onChangeIdReunion (e) {
        this.setState({
            idReunion: e.target.value
        })
    }
    onChangeSujet (e) {
        this.setState({
            sujet: e.target.value
        })
    }
    onChangeMail (e) {
        this.setState({
            email: e.target.value
        })
    }


    send =  e => {
        localStorage.clear()

        if (this.state.email.length === 0) {
            console.log("email",this.state.email)
            localStorage.setItem('error', "email invalid");
            console.log("email",localStorage.getItem("error"))
            window.location = "/reunion"
            return;
        }
        if (this.state.idReunion.length === 0) {
            localStorage.setItem('error', "idReunion invalid");this.setState({
                ...this.state
            });
            window.location = "/reunion"
            return;
        }
let x;
        API.login(this.state.email, this.state.password).then(function (data) {
            console.log("hahaha",data.data)

            localStorage.setItem("token",data.data.token)
            API.decrypt().then((data)=>{
                localStorage.setItem("id",data.data.id)
                localStorage.setItem("email",data.data.email)
                localStorage.setItem("username",data.data.username)
                localStorage.setItem("name",data.data.name)
                localStorage.setItem("success","vous êtes bien connecter")
                x=1;


                return window.location = "/Dashboard"
            })




            //window.location = "/dashboard"
        }, function (error ) {
            localStorage.setItem("error","mot de pass ou nom d'utilisateur est incorrect")
            console.log("hahaha",error)
            x=2
            window.location = "/connexion"

            return
        });


        this.setState({
            ...this.state
        });
        ///console.log(error);
        if(x==1)window.location = "/Dashboard"
        if(x==2)window.location = "/connexion"
        return  ;

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
            <Container>
                <Row>
                    <Col xs="3" className="barreGauche">
                         <CompteForm buttonLabel ={"Créer une nouvelle réunion."} onChangeIdReunion={this.onChangeIdReunion} onChangeSujet={this.onChangeSujet} onChangeMail={this.onChangeMail} sujet ={this.state.sujet} email={this.state.email} idReunion={this.state.idReunion} send={this.send} />

                    </Col>

                    <Col xs="9">



                    </Col>
                </Row>

            </Container>


        )
    }




}