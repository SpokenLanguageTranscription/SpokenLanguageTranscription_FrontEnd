import React, { Component,useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText,Table} from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import NotificationAlert from 'react-notification-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-notification-alert/dist/animate.css";
import { Container, Row, Col } from 'reactstrap';
import "../App.css";
import API from "../Composants/API";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {FaMicrophone, FaMicrophoneSlash} from 'react-icons/fa'

//------------------------SPEECH RECOGNITION-----------------------------

/* const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'fr-FR'*/


//------------------------COMPONENT-----------------------------

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
      //x : localStorage.getItem('ParticipantIDReunion'),
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
      })
    }
    console.log("voici le texte:",document.getElementById('final').innerHTML)
    console.log("test barry")
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

           <div class="LoginBack">

          <div style={container}>
            <button id='microphone-btn' style={button} onClick={this.toggleListen}>Micro </button>
            <div id='interim' style={interim}></div>
            <div id='final' style={final}></div>
            <div id='resultat' style={resultat}></div>

          </div>
          </div> 
          </div>

          /* <div>
          <Form center>
          <FormGroup>
              <Label for="idReunion">Texte en cours</Label>
              <Input type="text" name="" id="interim" placeholder="A23AZE" value=""
                      />
          </FormGroup>
          <FormGroup>
              <Label for="Sujet">Votre Texte</Label>
              <Input type="text" name="" id="final" placeholder="Votre Texte" value=""
                      />
          </FormGroup>
          <FormGroup>
              <Label for="Sujet">Le résultat</Label>
              <Input type="text" name="" id="resultat" placeholder="Votre Texte" value=""
                      />
          </FormGroup>
      </Form>
      </div>
      </div> */

          )
        } else {
          return(
             <div class="LoginBack">

          <div style={container}>
            <button id='microphone-btn' style={button} onClick={this.toggleListen}><FaMicrophone/> </button>
            <button style={button} onClick={this.stopListen}><FaMicrophoneSlash/> </button>
            <div id='interim' style={interim}></div>
            <div id='final' style={final}></div>
            <div id='resultat' style={resultat}></div>

          </div>
          </div> 
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
    background: 'lightblue',
    borderRadius: '50%',
    margin: '6em 0 2em 0'
  },
  interim: {
    color: 'gray',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  final: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  resultat: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  }
}

const { container, button, interim, final, resultat } = styles