import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "../App.css";


import "../App.css";
import NotificationAlert from 'react-notification-alert';
var options1 = {};
var options2 = {};
options1 = {
    place: 'tl',
    message: (
        <div>
            <div>
                {localStorage.getItem("sucess")}
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
            nom: '',
            prenom: '',
            email:'',
            cmail:'',
            password:'',
            cpass:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    
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
    render () {
        return (
           
            <section className="Compte1">
                <NotificationAlert ref="notify" />
                    <h1 className="h1">Créer un compte</h1>
                        <form key="frm" onSubmit={this.onSubmit}>
                           
                            <div>
                                <label htmlFor="nom">Nom</label>
                                <input type="text"
                                    className="form-control"
                                    name="nom"
                                    placeholder="Nom"
                                    value={this.state.nom}
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
                                <label htmlFor="email">Confirmation Email</label>
                                <input type="email"
                                    className="form-control"
                                    name="cmail"
                                    placeholder=" E-mail"
                                    value={this.state.cmail}
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


                            <div>
                                <label htmlFor="password2">Confirmer mot de passe</label>
                                <input type="password"
                                    className="form-control"
                                    name="cpass"
                                    placeholder="Password"
                                    value={this.state.cpass}
                                    onChange={this.onChange} />
                            </div>

                            <div className="createAccount">
                                <button type="submit" className="MyButtom">Créer</button>
                                
                                <Link to="/Connexion">
                                <small>S'identifier</small>
                                </Link>

                            </div>
                        </form>
                    
             
            </section>
           
        )
    }
}