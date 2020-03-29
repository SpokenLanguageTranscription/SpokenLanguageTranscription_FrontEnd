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
        row,
        idReunion,sujet,date,
    } = props;
    return <tr className="maLigine" >

        <th scope='row' key={row} className="maLigine">{idReunion}</th><td className="maLigine">{sujet}</td><td className="maLigine" >{date}</td>


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

            createur :localStorage.getItem("email"),
        }


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
                                    tab.map(row => <TableReunion row={i++} key={i+1000} idReunion={row.idReunion} sujet={row.sujet} date={row.createdAt}  />)
                                }
                                </tbody>
                            </Table>
                        </Col>

                        <Col xs="9" className="barreDroite ">
                            <MyDash />

                        </Col>
                    </Row>
                  </Container>
            </React.Fragment>
           

                  )
    }
   
}