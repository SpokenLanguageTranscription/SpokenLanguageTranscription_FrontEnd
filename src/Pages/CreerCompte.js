import React, { Component } from 'react';
import {Link} from 'react-router-dom';



export default class CreerCompte extends Component {
   
    constructor() {
        super()
        this.state = {
            nom: '',
            prenom: '',
            mail:'',
            cmail:'',
            pass:'',
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

    render () {
        return (
           
            <section className="Compte">
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
                                    value={this.state.mail}
                                    onChange={this.onChange} />
                            </div>

                            <div>
                                <label htmlFor="email">Confirmation Email</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
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
                                    value={this.state.pass}
                                    onChange={this.onChange} />
                            </div>


                            <div>
                                <label htmlFor="password2">Confirmer mot de passe</label>
                                <input type="password"
                                    className="form-control"
                                    name="password2"
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