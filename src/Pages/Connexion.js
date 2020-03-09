import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import  API from '../Composants/API'

export default class Connexion extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
        this.onChangeMail = this.onChangeMail.bind(this)
        this.onChangePass = this.onChangePass.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeMail (e) {
        this.setState({ 
            email: e.target.value
        })
    }

    onChangePass (e) {
        this.setState({
            password: e.target.value
         })
    }

    send = event => {
        if (this.state.email.length === 0) {
            localStorage.setItem('text', "email invalid"); this.setState({
                ...this.state
            });
            window.location = "/connexion"
            return;
        }
        if (this.state.password.length === 0) {
            localStorage.setItem('text', "pass invalid");this.setState({
                ...this.state
            });
            window.location = "/connexion"
            return;
        }

        API.login(this.state.email, this.state.password).then(function (data) {
            console.log("hahaha",data)

            localStorage.setItem("token",data.data.token)
            API.decrypt().then((data)=>{
                localStorage.setItem("id",data.data.id)
                localStorage.setItem("email",data.data.email)
                localStorage.setItem("username",data.data.username)
                localStorage.setItem("name",data.data.name)

            })




            //window.location = "/dashboard"
        }, function (error ) {

        });


        this.setState({
            ...this.state
        });
        ///console.log(error);
        //  window.location = "/";
        return  ;

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
                                    value={this.state.email}
                                    onChange={this.onChangeMail} />
                            </div>
                            <div className="form-group col-md-12 mt-5">
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Mot de passe"
                                    value={this.state.password}
                                    onChange={this.onChangePass} />
                            </div>
                            <div className="createAccount">

                                <Link to="/">
                                <button type="submit" onClick={this.send} className="MyButtom">Authentification</button>
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