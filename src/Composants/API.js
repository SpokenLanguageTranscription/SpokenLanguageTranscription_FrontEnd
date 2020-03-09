import axios from 'axios';
const headers = {
    'Content-Type': 'application/json',
    //  credentials : 'same-origin'
    //  credentials : 'same-origin'

}

const headers1 = {
    'Content-Type': 'application/json',
    //  credentials : 'same-origin'
    //  credentials : 'same-origin'

    'Authorization': 'Bearer '+localStorage.getItem("token")
}
const burl = "http://localhost:5000"

const API  ={
    decrypt: function() {
console.log("herder",headers1)

        return axios.post(burl + '/users/decrypt',{

        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
            ,},)

    }
    //window.localStorage.setItem("secretToken", query.token);
,
      login : function(email,password) {

        return axios.post(burl + '/users/login',{
            'email' : email,
            'password' : password
        },{
            headers: headers

            ,},)

    }
    //window.localStorage.setItem("secretToken", query.token);

  ,
    signup : function(send){ console.log("send",send)
        return axios.post(burl + '/users/register',send,{headers: headers})
    },



    isAuth : function() {

        return (localStorage.getItem('token') !== null);


    },

    logout : function() {
        localStorage.clear();
    }
}
export default API;