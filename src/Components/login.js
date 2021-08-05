import React, { Component } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login'
import './login.css'
import { ToastContainer } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

class Login extends Component {
    state = { 
        account : {
            email : "",
            password : ""
        }
    }

    

    componentDidMount() {
       const token = localStorage.getItem('token')
       if(token && token.length >= 5){
       axios.post('https://authenticateassign.herokuapp.com/auth/verify' , {
           token : token })
       .then ( res => {
           console.log(res.data)
           if(res.data === 'valid'){
            window.location.assign('/screen2')
           }
       })

       .catch( err => {
           console.log(err)
       })
    }
    else{
        console.log('no token')
    }
    }

    handleChange = (e) => {
        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ account });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email : this.state.account.email,
            password : this.state.account.password,
        }
        axios.post('https://authenticateassign.herokuapp.com/auth/authenticate', data)
        .then((res) => {
            console.log(res.data)
            if(res.data === 'Invalid credentials'){
                toast(`Please check you credentials Once again`)
            }

            else{
                localStorage.setItem('token'  , res.data)
                window.location.assign('/screen2')
            }
           
        })
        .catch((err) => {
            let account = {...this.state.account};
            account.email = ""
            account.password = ""
            this.setState({account})
            toast(`Login Failed`)
        });
    }



    render() { 
        return ( 
            <>
                 <ToastContainer></ToastContainer>
            <div className="login-whole">

                <div className="left-img-login">
                    <img src="./login.png" className="login"></img>
                </div>
            <form className="login-form">
                <div className="login-title">Nemesis </div>
                <div className="email-login" >Email</div>
                <input name="email" type="mail" className="input-email-login" value={this.state.account.email} onChange={this.handleChange}></input>
                <div className="password-login">Password</div>
                <input name="password" className="input-password-login" type="password" value={this.state.account.password} onChange={this.handleChange}></input>
                <div className="btns-login-flex">
                <div type="submit" onClick={this.handleSubmit} className="login-btn">Login</div>
         
         

                </div>

            </form>
            </div>
            </>
         );
    }
}
 
export default Login;
