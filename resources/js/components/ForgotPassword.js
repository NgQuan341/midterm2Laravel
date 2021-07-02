import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Forgot extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    sendMail(formdata){
        console.log(formdata);
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/sendmail',
            data: formdata
          })
          .then(res=>{
            if(res.data.status == 'success'){
                let entercode = prompt("enter your pin","your pin")
                if(this.checkCode(entercode,res.data.pin)){
                    this.props.history.push(`/resetpassword/${res.data.id}`);
                }
                else{
                    alert("your code was wrong!!")
                }  
            }
            else{
                alert('Your email was wrong');
            }
          }).catch(err=>{

          });
    }
    submitForm(){
       
        this.sendMail({
            'email': document.getElementById('email').value
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
                        <h3 className="login-box-msg">SIGN IN</h3>
                        <form>
                            <div className="input-group mb-3">
                                <input type="email" name="email" id="email" placeholder="Email" className="form-control" required/>
                           
                                <div className="col-4">
                                    <button type="button" onClick={()=>this.submitForm()} className="btn btn-primary btn-block">submit</button>
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

export default Forgot;
