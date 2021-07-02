import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
class Logup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors:[],
            password:"",
            hasemail:""
        }
    }
    logup(formdata){
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/logup',
            data: formdata
          })
          .then(res=>{
            console.log(res.data.status);
            if(res.data.status =="success"){
                alert("Register success!!!")
                this.props.history.push('/login')
            }
            else{
                
                this.setState({errors:res.data.errors,
                password:res.data.password,
                hasemail:res.data.hasemail})
                console.log(res.data.password);
                
            }
          }).catch(err=>{

          });
    }
    submitForm(){
       
        let data = {
            'name': document.getElementById('name').value,
            'address': document.getElementById('address').value,
            'phone':document.getElementById('phone').value,
            'email': document.getElementById('email').value,
            'password':document.getElementById('password').value,
            'repassword':document.getElementById('repassword').value
        }
        this.logup(data);
    }
    viewPassword=(string)=>{
        let element =document.getElementById(string)
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
                <div  className="row justify-content-center">
                    <div className="card col-4">
                        <div className="card-body login-card-body">
                            <h3 className="login-box-msg">Register</h3>
                            <form>
                                <div className="input-group mb-3">
                                    {/* <label>Full Name</label> */}
                                    <input type='text' name="name" id='name' placeholder="Fullname" className="form-control"></input>
                                 
                                </div>
                                <p style={{display:this.state.errors.length!== 0 ? 'block':'none',color:'red'}}>{this.state.errors.name}</p>
                                <div className="input-group mb-3">
                                    {/* <label>Address</label> */}
                                    <input type='text' name="address" id='address' placeholder="Address" className="form-control"></input>
                                  
                                </div>
                                <p style={{display:this.state.errors.length!== 0 ? 'block':'none',color:'red'}}>{this.state.errors.address}</p>
                                <div className="input-group mb-3">
                                    {/* <label>Phone number</label> */}
                                    <input type='text' name="phone" id="phone" placeholder="Phone" className="form-control"></input>
                                   
                                </div>
                                <p style={{display:this.state.errors.length!== 0 ? 'block':'none',color:'red'}}>{this.state.errors.phone}</p>
                                <div className="input-group mb-3">
                                    {/* <label>Email</label> */}
                                    <input type='email' name='email' id='email' placeholder="Email" className="form-control"></input>
                                 
                                </div>
                                <p style={{display:this.state.errors.length!== 0 ? 'block':'none',color:'red'}}>{this.state.errors.email}</p>
                                <p style={{display:this.state.hasemail!== "" ? 'block':'none',color:'red'}}>{this.state.hasemail.hasemail}</p>

                                <div className="input-group mb-3">
                                    {/* <label>Password</label> */}
                                    <input type='password' name="password" id='password' placeholder="Password" className="form-control" required></input>
                                    <button type="button" className="input-group-text" onClick={()=>this.viewPassword("password")}>@</button>
                                </div>
                                <p style={{display:this.state.password!== "" ? 'block':'none',color:'red'}}>{this.state.password.password}</p>

                                <div className="input-group mb-3">
                                    {/* <label>Re-password</label> */}
                                    <input type='password' name="repassword" id='repassword' placeholder="Repassword" className="form-control" required></input>
                                    <button type="button" className="input-group-text" onClick={()=>this.viewPassword("repassword")}>@</button>
                                </div>
                                <p style={{display:this.state.password!== "" ? 'block':'none',color:'red'}}>{this.state.password.repassword}</p>

                                <div className="col-5" style={{padding:"0px"}}>
                                    <button type="button" onClick={()=>this.submitForm()} className="btn btn-primary btn-block">Register</button>
                                </div>
                            </form>
                            <p className="mb-1">
                                {/* <a href="{{ route('password.request') }}">I forgot my password</a> */}
                            </p>
                            <p className="mb-0">
                            <Link to="/login" className="text-center">Log in</Link>
                            </p>
                        </div>
                        {/* /.login-card-body */}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Logup;
