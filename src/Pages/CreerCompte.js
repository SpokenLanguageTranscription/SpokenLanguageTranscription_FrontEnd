import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "../App.css";


import "../App.css";

import API from "../Composants/API";
import NotificationAlert from 'react-notification-alert';
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



export default class CreerCompte extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            genre : '',
            prenom :'',
            email : '',
            password : '',
            username :'',
            dateNaissance : '',
            ville : '',
            mobile: '',
            active:true,

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }


    send =  e => {
        localStorage.clear()

        if (this.state.email.length === 0) {
            localStorage.setItem("error","Ajouter un email")
            window.location = "/inscription"
            return;
        }
        if (this.state.password.length === 0) {
            localStorage.setItem("error","Ajouter un mot de passe")
            window.location = "/inscription"
            return;
        }

        API.signup({prenom:this.state.prenom,name:this.state.name,email:this.state.email, password :this.state.password,genre:this.state.genre,username:this.state.username}).then(function (data) {
            console.log("hahaha",data.data)


            localStorage.setItem("success","inscription avec succès.")
                return window.location = "/connexion"





            //window.location = "/dashboard"
        }, function (error ) {
            localStorage.setItem("error",error)
            console.log("hahaha",error)

            window.location = "/inscription"

            return

        })}


        onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()
        
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
           
            <section className="Compte1">
                <NotificationAlert ref="notify" />
                    <h1 className="h1">Créer un compte</h1>
                        <form key="frm" onSubmit={this.onSubmit}>
                           
                            <div>
                                <label htmlFor="name">Nom</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="name"
                                    value={this.state.name}
                                    onChange={this.onChange} />
                            </div>


                            <div>
                                <label htmlFor="prenom">Prénom</label>
                                <input type="text"
                                    className="form-control"
                                    name="prenom"
                                    placeholder=" Prenom"
                                    value={this.state.prenom}
                                    onChange={this.onChange} 
                                />
                            </div>


                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder=" E-mail"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>

                            <div>
                                <label htmlFor="password2">Username</label>
                                <input type="username"
                                       className="form-control"
                                       name="username"
                                       placeholder="username"
                                       value={this.state.username}
                                       onChange={this.onChange} />
                            </div>


                            <div>
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>




                            <div className="createAccount">
                                <button type="submit" className="MyButtom" onClick={this.send}>Créer</button>
                                
                                <Link to="/Connexion">
                                <small>S'identifier</small>
                                </Link>

                            </div>
                        </form>
                    
             
            </section>
           
        )
    }
}