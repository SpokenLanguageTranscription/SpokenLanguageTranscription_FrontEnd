import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Connexion extends Component {

    constructor() {
        super()
        this.state = {
            mail: '',
            pass: '',
        }
        this.onChangeMail = this.onChangeMail.bind(this)
        this.onChangePass = this.onChangePass.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeMail (e) {
        this.setState({ 
            mail: e.target.value 
        })
    }

    onChangePass (e) {
        this.setState({
            pass: e.target.value
         })
    }

    onSubmit (e) {
        e.preventDefault()

    }

    render () {
        return (
            
            <section className="Compte">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h1">Connectez vous</h1>



                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder=" E-mail"
                                    value={this.state.mail}
                                    onChange={this.onChangeMail} />
                            </div>
                            <div className="form-group col-md-12 mt-5">
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Mot de passe"
                                    value={this.state.pass}
                                    onChange={this.onChangePass} />
                            </div>
                            <div className="createAccount">

                                <Link to="/">
                                <button type="submit" className="MyButtom">Authentification</button>
                                </Link>
                                
                                
                                <Link to="/RecupPass" className="small-connexion">
                                <small className="small-connexion">Mot de pass oublié ?</small>
                                </Link>

                                <Link to="/CreerCompte" className="small-connexion">
                                <small className="small-connexion">Créer un Compte</small>
                                </Link>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </section>
           
        )
    }



    
}