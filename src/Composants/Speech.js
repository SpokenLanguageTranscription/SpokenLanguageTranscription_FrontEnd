import React, { Component,useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText,Table} from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import NotificationAlert from 'react-notification-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-notification-alert/dist/animate.css";
import { Container, Row, Col } from 'reactstrap';
import "../App.css";
import API from './API';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {FaMicrophone, FaMicrophoneSlash} from 'react-icons/fa'
import {MdDeleteForever} from 'react-icons/md'
import { SegmentInline } from "semantic-ui-react";
import Avatar from 'react-avatar';

//------------------------SPEECH RECOGNITION-----------------------------

/* const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'fr-FR'*/


//------------------------COMPONENT-----------------------------


const TableDiscution = (props)=>{
const [dropdownOpen, setOpen] = useState(false);

const toggle = () => setOpen(!dropdownOpen);


const {
    row,
    auteur,phrase,date,
} = props;
return <tr>
    <th scope='row' key={row} className="container">
          <div className="container">

              <p>  <Avatar facebookId="100009606691669" size="50" />&nbsp;&nbsp;

                  {auteur} : {phrase}</p>
             <span className="time-right">{date} </span>
              </div>
    </th>
</tr>
}

const ParticipationForm = (props) => {
  const {
      className,onChangeParticipantIdReunion,ParticipantIDReunion,onChangeParticipantName,participantName,send, prev
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
      <div>
          <Modal isOpen={modal} className={className}>
              <ModalHeader>Formulaire de Participation à une réunion</ModalHeader>
              <ModalBody>
                  <div>
                      <Form>
                          <FormGroup>
                              <Label for="idReunion">ID Réunion</Label>
                              <Input type="text" name="idReunion" id="idReunion" placeholder="A23AZE" value={ParticipantIDReunion}
                                     onChange={onChangeParticipantIdReunion} />
                          </FormGroup>
                          <FormGroup>
                              <Label for="Sujet">Votre Nom</Label>
                              <Input type="text" name="sujet" id="Sujet" placeholder="Votre Nom" value={participantName}
                                     onChange={onChangeParticipantName} />
                          </FormGroup>
                      </Form></div>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={send}>Enregistrer</Button>{' '}
                  <Button color="secondary" onClick={prev}>Cancel</Button>
              </ModalFooter>
          </Modal>
      </div>
  );
}

//Reconnaissance vocale
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'fr-FR'

export default class Speech extends Component {

  constructor() {
    super()
    this.state = {
      listening: false,
      participantName :"",
      ParticipantIDReunion:"",
      test : true
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
    this.onChangeParticipantName = this.onChangeParticipantName.bind(this)
    this.onChangeParticipantIdReunion = this.onChangeParticipantIdReunion.bind(this)
    this.onChangeTest = this.onChangeTest.bind(this)
    this.send = this.send.bind(this)
    this.prev = this.prev.bind(this)
    this.stopListen = this.stopListen.bind(this)
    this.sendWords = this.sendWords.bind(this)
    this.cleanListen = this.cleanListen.bind(this)
    
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  stopListen() {
    if (this.state.listening) {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
      this.setState({
        listening: false
      },  this.sendWords())

    }
    console.log("voici le texte:",document.getElementById('final').innerHTML)
    console.log("test barry")
  }

  cleanListen(){
    //document.getElementById('final').nodeValue= ""
    window.location = '/Speech'
  }
  onChangeParticipantName (e) {
    this.setState({
        participantName: e.target.value
    })
}
  onChangeParticipantIdReunion (e) {
    this.setState({
        ParticipantIDReunion: e.target.value
    })
  }

  onChangeTest (e) {
    this.setState({
        test: e.target.value
    })
  }

  handleListen() { 

    console.log('listening?', this.state.listening)

    if (this.state.listening) {
      
      recognition.start()
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }

    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById('final').innerHTML = finalTranscript
     //*************Resultat******************* */
      if(interimTranscript === 'suivant'){
        console.log(finalTranscript);
        document.getElementById('resultat').innerHTML = "Bravo"
      }
    //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'stop'){
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText          
          //document.getElementById('resultat').innerHTML = finalText 
        }
      }
    }
    
  //-----------------------------------------------------------------------
    
    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

  }

  //Envoyer la phrase dans la Base de données MongoDB Atlas
  sendWords = e => {

    if(document.getElementById('final').innerHTML != null){
          console.log("voici je suis ici")
          API.sendPhrase(document.getElementById('final').innerHTML).then(function (data){
            console.log("hahaha",data.data)
              return window.location = "/speech"
        }, function (error ) {
            localStorage.setItem("error",error)
            console.log("hahaha",error)

            //window.location = "/speech"

            return
          })

      }
  }

    send =  e => {

      localStorage.setItem("ParticipantIDReunion", this.state.ParticipantIDReunion);
      localStorage.setItem("ParticipantName", this.state.participantName); 
      console.log('voici', localStorage.getItem("ParticipantIDReunion")) 
      console.log('voici', localStorage.getItem("ParticipantName")) 
      window.location = "/Speech" 
  return  ;

  }

  prev = e => window.location = "/"
  affiche = e => {
    console.log('voici', localStorage.getItem("ParticipantIDReunion")) 
      console.log('voici', localStorage.getItem("ParticipantName"))
      return
  }
  render() {
    let tab = []
    tab.map(row => console.log("tab") )
        if (localStorage.getItem('ParticipantIDReunion') === null || localStorage.getItem('ParticipantName') === null ) {
          console.log('voici', localStorage.getItem("ParticipantName"))
          return(
            <div>
            <div>
                <ParticipationForm 
          onChangeParticipantIdReunion={this.onChangeParticipantIdReunion} ParticipantIDReunion={this.state.ParticipantIDReunion} 
          onChangeParticipantName={this.onChangeParticipantName} participantName={this.state.participantName} 
          send={this.send} prev = {this.prev} 
          />
          </div>
        <Container>
            <NotificationAlert ref="notify" />
            <Row>
                <Col xs="3" className="barreGauche">
                    <div class="LoginBack">

                    <div style={container}>
                    <div  style={{display:"block",width:"440px"}}>
                    <button id='microphone-btn' style={{ width: '60px',height: '60px',borderRadius: '50%',margin: '6em 0 2em 0', background: '#356859'}} onClick={this.toggleListen}><FaMicrophone/> </button>
                    <button style={{width: '60px',height: '60px',borderRadius: '50%',margin: '6em 0 2em 0', background: '#37966F'}} onClick={this.stopListen}><FaMicrophoneSlash/> </button>
                    <button style={{width: '60px',height: '60px',borderRadius: '50%',margin: '6em 0 2em 0', background: '#FD5523'}} onClick={this.cleanListen}><MdDeleteForever/> </button>
                    
                    </div>
                    <div id='interim' style={interim}></div>
                    <div id='final' style={final}></div>
                    <div id='resultat' style={resultat}></div>

                    </div>    
                    </div> 
            </Col>

            <Col xs="9" className="barreDroite ">
                <Table hover >
                    <thead>
                    <tr>
                        <th>{this.state.sujet}</th>

                    </tr>
                    </thead>
                    <tbody>
                    {

                        tab.map(row => <TableDiscution row="" auteur="Test" phrase="Test" date="Test"  />)
                    }
                        </tbody>
                    </Table>


                </Col>
            </Row>

        </Container>

            
          </div>

          
          )
        } else {
          return(
             

     <Container>
        <NotificationAlert ref="notify" />
        <Row>
            <Col xs="3" className="barreGauche">
                    <div class="LoginBack">

                    <div style={container}>
                    <div  style={{display:"block",width:"440px"}}>
                    <button id='microphone-btn' style={{ width: '60px',height: '60px',borderRadius: '50%',margin: '6em 0 2em 0', background: '#356859'}} onClick={this.toggleListen}><FaMicrophone/> </button>
                    <button style={{width: '60px',height: '60px',borderRadius: '50%',margin: '6em 0 2em 0', background: '#37966F'}} onClick={this.stopListen}><FaMicrophoneSlash/> </button>
                    <button style={{width: '60px',height: '60px',borderRadius: '50%',margin: '6em 0 2em 0', background: '#FD5523'}} onClick={this.cleanListen}><MdDeleteForever/> </button>
                    
                    </div>
                    <div id='interim' style={interim}></div>
                    <div id='final' style={final}></div>
                    <div id='resultat' style={resultat}></div>

                    </div>    
                    </div> 
            </Col>

            <Col xs="9" className="barreDroite ">
                <Table hover >
                    <thead>
                    <tr>
                        <th>{this.state.sujet}</th>

                    </tr>
                    </thead>
                    <tbody>
                    {

                        tab.map(row => <TableDiscution row="" auteur="Test" phrase="Test" date="Test"  />)
                    }
                    </tbody>
                </Table>


            </Col>
        </Row>

</Container>

        )
      }     
  }
}



//-------------------------CSS------------------------------------

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  button: {
    width: '60px',
    height: '60px',
    background: 'Red',
    borderRadius: '50%',
    margin: '6em 0 2em 0',
  },
  interim: {
    color: 'gray',
    border: 'medium dashed green',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  final: {
    color: 'black',
    border: 'outset #f33',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  resultat: {
    color: 'black',
    border: 'outset #f33',
    padding: '1em',
    margin: '1em',
    width: '300px'
  }
}

const { container, button, interim, final, resultat } = styles