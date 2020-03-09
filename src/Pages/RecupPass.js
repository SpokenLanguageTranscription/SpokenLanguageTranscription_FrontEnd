import React, { Component } from 'react'
import "../../src/App.css";
import {Link} from 'react-router-dom';


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};


export default class RecupPass extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
         
          mail: null,
          pass: null,
          
        };
      }
    
      handleSubmit = e => {
     //   e.preventDefault();
    
      //  if (formValid(this.state)) {
      //    console.log(`
           
      //      Email: ${this.state.email}
       //     Password: ${this.state.password}
       //   `);
      //  } else {
    //      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    //    }
      };
    
      handleChange = e => {
        e.preventDefault();
        
      };
    
      render() {
        const { formErrors } = this.state;
    
        return (
      
          <section className="Compte">
           <div className="wrapper">
            <div className="form-wrapper">


             <div className="col-md-12">
              <form onSubmit={this.handleSubmit} noValidate>
               
               <h1>Récuperer votre mot de passe</h1>
                

                <div className="createAccount">
                
                <div className="email">
                <label htmlFor="email">Email</label>
                  
                  <input
                    
                    placeholder="Email"
                    type="email"
                    name="email"
                    noValidate
                    onChange={this.handleChange}
                  />
                 
                </div>
                </div>
              
    
                <div className="createAccount">
                  
                <div className="col-md-4">
                <Link to='/'>
                <button className="submit" className="MyButtom"> Envoyer </button>
                </Link>
                </div>
                </div>
    
    
               
              </form>
              </div>
            </div>
          </div>
          </section>
         
        );
      }
}