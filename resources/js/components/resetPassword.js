import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    changePassword(formdata){
        console.log(formdata);
        axios({
            method: 'put',
            url: 'http://localhost:8000/api/logup',
            data: formdata
          })
          .then(res=>{
           if(res.data.status == 'success'){
               alert("update password success")
                this.props.history.push('/login');
           }
          }).catch(err=>{

          });
    }
    submitForm(){
       
        this.changePassword({
            'id':this.props.match.params.id,
            'password': document.getElementById('password').value,
            'repassword': document.getElementById('repassword').value,
        });
    }
    checkCode = (enterCode,rightCode) =>{
        if(enterCode==rightCode){
            return true;
        }
        else 
            return false;
    }
    componentDidMount() {
    }
    render() {
        return (
            <Fragment>
                <div className="row justify-content-center">
                <div className="card col-4">
                    <div className="card-body login-card-body ">
                        <h3 className="login-box-msg">RESET PASSWORD</h3>
                        <form>
                        <div className="input-group mb-3">
                                    {/* <label>Password</label> */}
                                    <input type='password' name="password" id='password' placeholder="Password" className="form-control" required></input>
                                    <button type="button" className="input-group-text" onClick={()=>this.viewPassword("password")}>@</button>
                                </div>
                                {/* <p style={{display:this.state.password!== "" ? 'block':'none',color:'red'}}>{this.state.password.password}</p> */}

                                <div className="input-group mb-3">
                                    {/* <label>Re-password</label> */}
                                    <input type='password' name="repassword" id='repassword' placeholder="Repassword" className="form-control" required></input>
                                    <button type="button" className="input-group-text" onClick={()=>this.viewPassword("repassword")}>@</button>
                                </div>
                                {/* <p style={{display:this.state.password!== "" ? 'block':'none',color:'red'}}>{this.state.password.repassword}</p> */}
                                <div className="col-5" style={{padding:"0px"}}>
                                    <button type="button" onClick={()=>this.submitForm()} className="btn btn-primary btn-block">Change password</button>
                                </div>
                        </form>
                    </div>
                </div>

                </div>
              
            </Fragment>
        )
    }
}

export default ResetPassword;
