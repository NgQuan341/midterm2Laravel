import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors:[],
            password:""
        }
    }
    login(formdata){
        console.log(formdata);
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/login',
            data: formdata
          })
          .then(res=>{
            console.log(res.data.status);
            if(res.data.status == "success"){
                alert("Login success!!")
                this.props.history.push('/cars')
            }
            else{
                this.setState({errors:res.data.errors,
                    password:res.data.password})
                    console.log(res.data.password);
            }
          }).catch(err=>{

          });
    }
    submitForm=()=>{
       
        this.login({
            'email': document.getElementById('email').value,
            'password':document.getElementById('password').value
        });
    }
    viewPassword=()=>{
        let element =document.getElementById("password")
        if(element.getAttribute('type')=="password")
        element.setAttribute("type", "text"); 
        else
        element.setAttribute("type", "password"); 
     }
    componentDidMount() {
    }
    render() {
        return (
            <Fragment>
                <div className="row justify-content-center">
                <div className="card col-4">
                    <div className="card-body login-card-body ">
                        <h3 className="login-box-msg">SIGN IN</h3>
                        <form>
                            <div className="input-group mb-3">
                                <input type="email" name="email" id="email" placeholder="Email" className="form-control"/>
                            </div>
                            <p style={{display:this.state.errors.length!== 0 ? 'block':'none',color:'red'}}>{this.state.errors.email}</p>
                            <div className="input-group mb-3">
                                <input type="password" name="password" id="password" placeholder="Password" className="form-control" />
                                <button type="button" className="input-group-text" onClick={()=>this.viewPassword()}>@</button>
                            </div>
                            <p style={{display:this.state.password!== "" ? 'block':'none',color:'red'}}>{this.state.password.password}</p>

                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">Remember Me</label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="button" onClick={()=>this.submitForm()} className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>
                        <p className="mb-1">
                            <Link to="/forgotpassword">I forgot my password</Link>
                        </p>
                        <p className="mb-0">
                            <Link to="/logup" className="text-center">Register</Link>
                        </p>
                    </div>
                </div>

                </div>
              
            </Fragment>
        )
    }
}

export default Login;
