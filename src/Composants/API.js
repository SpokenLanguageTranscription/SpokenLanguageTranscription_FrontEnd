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
  // const burl = "http://localhost:5000"
const burl = "https://woolksback.herokuapp.com"
const API  ={
    decrypt: function() {


        return axios.post(burl + '/users/decrypt',{

        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
            ,},)

    }
    //window.localStorage.setItem("secretToken", query.token);
, showAllMesReunion: function() {


        return axios.post(burl + '/reunion/mesreunions',{
            'email' : localStorage.getItem("email"),
        },{
            headers: headers1

            ,},)

    }, indicateur1: function(id,email) {

            console.log("ed,mail",id,email)
        return axios.post(burl + '/discourt/indicateur1',{
            'email' : email,
            'idReunion' : id
        },{
            headers: headers

            ,},)

    },showlastReunion: function() {


        return axios.post(burl + '/reunion/last',{
            'email' : localStorage.getItem("email"),
        },{
            headers: headers1

            ,},)

    }, showDiscutionReunion: function(idReunion,email) {

        if(idReunion !=null ){
            return axios.get(burl + '/discourt/'+email+'/'+idReunion,{
                headers: headers1

                ,},)

        }else{
            return axios.get(burl + '/discourt/'+email,{
                headers: headers1

                ,},)

        }

    },

      showDiscutionToParticipant: function(idReunion) {
        if(idReunion !=null ){
        return axios.post(burl + '/discourt/participant/',{
            'idReunion' : idReunion
        },{
            headers: headers

            ,},)

    

    }
 }
    ,supprimerMaReunion: function(idReunion) {

        console.log("API",idReunion)
        return axios.delete(burl + '/reunion/mesreunions/'+idReunion,{
            headers: headers1

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
    createReunion : function(idReunion,sujet,participants){

        return axios.post(burl + '/reunion',{
            'idReunion' : idReunion,
            'sujet' : sujet,
            'participants' : participants,
            'createur':localStorage.getItem("email")
        },{
            headers: headers1

            ,},)

    },
    //window.localStorage.setItem("secretToken", query.token);

    sendPhrase : function(phrase){
        return axios.post(burl + '/discourt/', {

            'phrase': phrase,
            'auteur': localStorage.getItem('ParticipantName'),
            'idReunion': localStorage.getItem('ParticipantIDReunion')
        },{
            headers:headers,

        })
    }
  ,    sendPhraseAdmin : function(id,phrase){
        return axios.post(burl + '/discourt', {
            'phrase': phrase,
            'auteur': localStorage.getItem('username'),
            'idReunion': id
        },{
            headers:headers,

        })
    }
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