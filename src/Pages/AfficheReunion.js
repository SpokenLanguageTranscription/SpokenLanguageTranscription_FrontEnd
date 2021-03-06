import React, { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Media,Table} from 'reactstrap';
import   { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import NotificationAlert from 'react-notification-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-notification-alert/dist/animate.css";
import { Container, Row, Col } from 'reactstrap';
import "../App.css";
import API from "../Composants/API";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import $ from "jquery";
import Avatar from 'react-avatar';




var options1 = {};
var options2 = {};
options1 = {
    place: 'tl',
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
    place: 'tl',
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
const TableDiscution = (props)=>{
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);


    const {
        row,
        auteur,phrase,date,
    } = props;
    return <tr>
        <th scope='row' key={row+2000} className="container">
              <div className="container">

                  <div>  <Avatar facebookId="100009606691669" size="50" />&nbsp;&nbsp;

                      {auteur} : {phrase}</div>
                 <span className="time-right">{date} </span>
                  </div>
        </th>
    </tr>
}

const CompteForm = (props) => {
    const {
        buttonLabel,
        className,onChangeIdReunion,idReunion,onChangeSujet,sujet,onChangeMail,participants,send
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
                                <Input type="email" name="participants" id="Email" placeholder="Steph@gmail.com;pascal@hotmail.com" value={participants}
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
let preS="";
let x= localStorage.getItem("idReunion");
export default class AfficheReunion extends Component {



    constructor() {
        super()
        this.state = {
            message:"",
            participants :"",
            idReunion:localStorage.getItem("idReunionActuelle"),
            sujet : localStorage.getItem("sujetActuelle") !=null ? localStorage.getItem("sujetActuelle") : this.lastReunion(localStorage.getItem("email")) ,
            createur :localStorage.getItem("email"),
        }
        if(this.state.idReunion !=""){
            this.setState({
                data : this.miseAjourDiscourt(this.state.idReunion,this.state.createur),
             })
        }else{
            this.setState({
                data : this.miseAjourDiscourt(null,this.state.createur),
             })

        }


        this.onChangeMail = this.onChangeMail.bind(this)
        this.onChangeSujet = this.onChangeSujet.bind(this)
        this.onChangeIdReunion = this.onChangeIdReunion.bind(this)
        this.send = this.send.bind(this)
        this.deleteReunion = this.deleteReunion.bind(this)
    }
    async miseAjourDiscourt (id,email) {
        await API.showDiscutionReunion(id,email).then((data)=>{
            if(preS.length!=data.data.length){

                preS=data.data
                console.log("hello1",preS.length!=data.data.length)

                var   element = document.getElementById('barreDroite');
                element.scrollTop =  999999999999999


                this.setState({
                    data: data.data
                })
            }



            if(id==null)  x=id

           if (id!=null) localStorage.setItem("idReu",id)
        })
    }
    async lastReunion (email) {


        await API.showlastReunion(email).then((data)=>{

            if (data.data.idReunion!=null)   localStorage.setItem("idReu",data.data.idReunion)
        localStorage.setItem("sujetActuelle",data.data.sujet)

            this.setState({
                sujet: data.data.sujet
            })
            return data.data.sujet
        })
    }
    onChangeIdReunion (e) {
        this.setState({
            idReunion: e.target.value
        })
    }
    onChangeMessage (e) {
        this.setState({
            message: e.target.value
        })
    }
    sendMessage =  e => {


        API.sendPhraseAdmin(localStorage.getItem("idReu"),this.state.message).then(function (data){


            return
        }, function (error ) {
            localStorage.setItem("error",error)
            console.log("hahaha",error)

            //window.location = "/speech"

            return
        })
        this.setState({
            message: ""
        })





    }
    onChangeSujet (e) {
        this.setState({
            sujet: e.target.value
        })
    }
    onChangeMail (e) {
        this.setState({
            participants: e.target.value
        })
    }


    send =  e => {


        if (this.state.participants.length === 0) {
            console.log("email",this.state.participants)
            localStorage.setItem("error", "Ajouter les mails des participants");

            window.location = "/reunion"
            return;
        }
        if (this.state.idReunion.length === 0) {
            localStorage.setItem("error", "Ajouter un ID pour la réunion");
            window.location = "/reunion"
            return;
        }
        if (this.state.sujet.length === 0) {
            localStorage.setItem("error", "Ajouter un sujet pour la réunion");
            window.location = "/reunion"
            return;
        }
        console.log("hahaha",this.state.idReunion, this.state.sujet,this.state.participants)
        API.createReunion(this.state.idReunion, this.state.sujet,this.state.participants).then(function (data) {

             if(data.data.reunion != null){
                 localStorage.setItem("success","Réunion ajouter avec succés")

             }else{
                 localStorage.setItem("error",data.data)
             }




                return window.location = "/reunion"





    }, function (error ) {
        localStorage.setItem("error","ID réunion existe déjà")
        console.log("hahaha",error)

       window.location = "/reunion"

        return
    });




    return  ;

}

    deleteReunion =  e => {
console.log("event:",e.target.value)

        API.supprimerMaReunion(e.target.value).then(function (data) {

            if(data.data != null){
                localStorage.setItem("success","Réunion supprimer avec succés")
               return window.location = "/reunion"
            }
        }, function (error ) {
            localStorage.setItem("error",error)
            console.log("hahaha",error)

               window.location = "/reunion"

            return
        });




        return  ;

    }
    componentWillUnmount(){
        localStorage.removeItem('idReunionActuelle')
    }
    componentDidMount() {

        console.log("2",localStorage.getItem("success"))
        if(localStorage.getItem('success')!= null) this.refs.notify.notificationAlert(options1);
        if(localStorage.getItem('error')!= null) this.refs.notify.notificationAlert(options2);
    }
    componentDidUpdate(prevProps,prevState) {
        localStorage.removeItem('success')
        localStorage.removeItem('error')
       // localStorage.removeItem('idReunionActuelle')

        this.miseAjourDiscourt(localStorage.getItem("idReunionActuelle"),localStorage.getItem("email"));
        if(x==this.state.idReunion) {this.lastReunion(localStorage.getItem("email"));x=2}
       // else x=2

       }
    render () {
        let tab = []
        for(let ligne in this.state.data){


            tab.push(this.state.data[ligne])
        }
        let i=1


        return (
            <Container className="maBox">
                <NotificationAlert ref="notify" />

                <Row className="monRow">
                    <Col xs="3" className="barreGauche" >
                         <CompteForm buttonLabel ={"Créer une nouvelle réunion."} onChangeIdReunion={this.onChangeIdReunion} onChangeSujet={this.onChangeSujet} onChangeMail={this.onChangeMail} sujet ={this.state.sujet} email={this.state.email} idReunion={this.state.idReunion} send={this.send} />

                    </Col>

                    <Col xs="9" className="barreDroite " id="barreDroite" >
                        <Table hover id="table"  >
                            <thead>
                            <tr>
                                <th>{this.state.sujet}</th>

                            </tr>
                            </thead>
                            <tbody>
                            {

                                tab.map(row => <TableDiscution row={i++} key={2000+i++} auteur={row.auteur} phrase={row.phrase} date={ row.createdAt }  />)
                            }
                            </tbody>
                        </Table>


                    </Col>
                </Row>
                <Form className="maForm">
                    <FormGroup>

                        <Input type="text" name="message" id="message" placeholder="écrit ton messages" value={this.state.message}
                               onChange={this.onChangeMessage.bind(this)} />
                    </FormGroup>
                    <Button color="primary" onClick={this.sendMessage}>envoyer</Button>

                </Form>

                <h1>jquery in React App</h1>
                <button>Click Me</button>
            </Container>


        )
    }




}