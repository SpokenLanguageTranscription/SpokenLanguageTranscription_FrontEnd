import React, {Component, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import NotificationAlert from 'react-notification-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-notification-alert/dist/animate.css";
import '../Appp.css';
import '../App.css';
import MyDash from "../Composants/MyDash.js"
import {
    Button,
    ButtonDropdown,
    Col,
    Container, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Row,
    Table
} from "reactstrap";
import API from "../Composants/API";
var options1 = {};
var options2 = {}

const TableReunion = (props)=>{
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
     const {
        row,passIdReunion,
        idReunion,sujet,date,
    } = props;
    //passIdReunion(()=> idReunion)
    function onClic(){
        console.log("click",idReunion)
        passIdReunion(idReunion)
    }
    return <tr className="maLigine"   onClick={onClic}>

        <th scope='row' key={row} className="maLigine"  >{idReunion}</th><td className="maLigine"  >{sujet}</td><td className="maLigine"  >{date}</td>


    </tr>
}

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
export default class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            data : this.miseAjourMesReunion(),
            idReunion:"",
            createur :localStorage.getItem("email"),
        }

    this.oUneAutreReunion=this.oUneAutreReunion.bind(this)
    }
    oUneAutreReunion (e) {

        console.log("hhhhhhhhhhhhhhhh",e)
        this.setState({
            idReunion: e
        })
        this.forceUpdate()
    }
    async miseAjourMesReunion () {
        await API.showAllMesReunion().then((data)=> {
            console.log("data1", data.data)
            this.setState({
                data: data.data
            })
            console.log("data2", this.state.data)
        })}
        componentDidMount() {
        if(localStorage.getItem('success')!= null) this.refs.notify.notificationAlert(options1);
        if(localStorage.getItem('error')!= null) this.refs.notify.notificationAlert(options2);
    }
    componentDidUpdate() {
        localStorage.removeItem('success')
        localStorage.removeItem('error')
    }
    componentWillUnmount() {
        this.setState({
            idReunion: ""
        })
    }

    render () {
        let tab = []
        for(let ligne in this.state.data){
            console.log("ligne",this.state.data[ligne])
            tab.push(this.state.data[ligne])
        }
        let i=1
        tab.map(row => console.log("tab",row) )

        return (
            <React.Fragment>

            <NotificationAlert ref="notify" />


                <Container className="maBox">
                    <NotificationAlert ref="notify" />

                    <Row className="monRow">
                        <Col xs="3" className="barreGauche" id="barreDroite">

                            <Table hover   id="maTable">

                                <tbody>
                                {
                                    tab.map(row => <TableReunion row={i++} key={i+1000} idReunion={row.idReunion} sujet={row.sujet} date={row.createdAt}   passIdReunion={this.oUneAutreReunion} />)
                                }
                                </tbody>
                            </Table>
                        </Col>

                        <Col xs="9" className="barreDroite ">
                            <MyDash idReunion ={this.state.idReunion != "" ? this.state.idReunion : tab.indexOf(0).idReunion} />

                        </Col>
                    </Row>
                  </Container>
            </React.Fragment>
           

                  )
    }
   
}