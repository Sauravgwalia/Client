import React, { Component } from 'react';
import './signup.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

class Signup extends Component {
    state = { 
        account : {
            username : "",
            mobilenumber : "",
            email : "",
            address : "",
        }
    }

    handleChange = (e) => {
        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ account });
    }

    validateEmail = (email)  =>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateUsername = (username)  =>{
        const re = /^[A-Za-z0-9]+$/
        return re.test(String(username));
    }

    validate = ({ email , username , address , mobilenumber }) => {
        var errobool = false

        const emailresult = this.validateEmail(email)
        const usernameresult = this.validateUsername(username)
        if(!emailresult){
            errobool=true
        }
        if(!usernameresult){
            errobool=true
        }
        if(mobilenumber.toString().length !== 10){
            errobool=true
        }

       return errobool
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username:this.state.account.username,
            email : this.state.account.email,
            mobilenumber : this.state.account.mobilenumber,
            address : this.state.account.address,
        }

      
        if(!this.validate(data)){
            console.log('valid')
                 axios.post('https://authenticateassign.herokuapp.com/auth/create', data)
        .then((res) => {

            let account = {...this.state.account};
            account.email = ""
            account.username = ""
            account.address = ""
            account.mobilenumber = ""
            this.setState({account})
            //redirect
            if(res.data === 'error'){
                toast(`Error Occured While Saving Data`)
            }
            else{
                toast('Data Added Successfully')
            }
          
        })
        .catch((err) => {
            //toast
            let account = {...this.state.account};
            account.email = ""
            account.username = ""
            account.address = ""
            account.mobilenumber = ""
            this.setState({account})
            toast(`Signup failed`)
        });
        }
        else{
            let account = {...this.state.account};
            account.email = ""
            account.username = ""
            account.address = ""
            account.mobilenumber = ""
            this.setState({account})
            toast('Please Check your Data Once Again')
        }
   
    }

    

    render() { 
        return ( 
            <>
                         <ToastContainer></ToastContainer>
            <div className="signup-whole">

                <div className="signup-img">
                    <img src="./signup.png" className="signup-left"></img>
                </div>
            <form className="signup-form">
                <div className="name-signup">Username</div>
                <input name="username" value={this.state.account.username} onChange={this.handleChange} className="input-name-signup"></input>
                <div className="email-signup">Mobile Number</div>
                <input name="mobilenumber" type="number" value={this.state.account.mobilenumber} onChange={this.handleChange} className="input-email-signup"></input>
                <div className="password-signup">Email</div>
                <input name="email" type="email" value={this.state.account.email} onChange={this.handleChange} className="input-password-signup"></input>
                <div className="confirm-password-signup">Address</div>
                <input name="address" type="text" value={this.state.account.address} onChange={this.handleChange} className="input-confirm-password"></input>
                <div type="submit" onClick={this.handleSubmit} className="signup-btn">Submit</div>
            
                
            </form>
            </div>
            </>
         );
    }
}
 
export default Signup;