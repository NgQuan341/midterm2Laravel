import React, { Component, Fragment } from 'react';
import CarsAPI from '../api/CarAPI';
import ManuAPI from '../api/ManuAPI';
import Swal from 'sweetalert2'
import axios from 'axios';
class CreateCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:"",
            name:"",
            model:"",
            img:"",
            image:"",
            mf_id:"",
            manufacture:[],
            errors:[]
        }
    }
    getAllManu = () => {
        ManuAPI
        .getAll()
        .then((res)=>{
            this.setState({manufacture:res})
        })
        .catch((err)=>{})
    }
    
    // SubmitForm = () =>{

    //    let data={
    //         name:document.getElementById('name').value,
    //         model:document.getElementById('model').value,
    //         img:this.state.img,
    //         mf_id:document.getElementById('manufacture').value,
    //     }
    //     console.log(this.state.image);
    //     this.createCar(data);
    //     this.props.history.goBack();
    // }
    onChangeHandle=(e)=>{
      
            this.setState({[e.target.name]:e.target.value})
        
    }
    SubmitForm = () =>{
        let data = new FormData();
        data.append('img',document.getElementById('img').files[0]);
        data.append('name',document.getElementById('name').value);
        data.append('model',document.getElementById('model').value);
        data.append('mf_id',document.getElementById('manufacture').value);
        // console.log(document.getElementById('img').files[0]);
        this.createCar(data);
        // this.props.history.goBack();
    }

    createCar = (data) =>{
        CarsAPI
        .post(data)
        .then((res)=>{
            if(res.status === 'success'){
                this.setState({errors:[]})
                this.props.history.goBack();
            }
            else {
                console.log(res.errors);
                this.setState({errors:res.errors})
            }
        })
        .catch((err)=>{})
    }
    uploadImage = async (event) => {
        const target = event.target;
        const file = target.files[0];
        const base64 = await  this.convertBase64(file);
        this.setState({img:base64});
        // console.log(base64);
      };
    
      convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    componentDidMount() {
        this.getAllManu()
    }
    render() {
        return (
            <Fragment>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name car</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        name='name' 
                        id="name" 
                        value={this.state.name}
                        onChange={this.onChangeHandle}
                        ></input>
                        <p style={{display:this.state.errors.length!== 0 ? 'block':'none',color:'red'}}>{this.state.errors.name}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="model" className="form-label">Model</label>
                        <input type="text" className="form-control" name='model' id="model"
                        value={this.state.model}
                         onChange={this.onChangeHandle}></input>
                        <p style={{display:this.state.errors.length!== 0 ? 'block':'none',color:'red'}}>{this.state.errors.model}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img" className="form-label"></label>
                        <img style={{display:this.state.img!= '' ?'block':'none',height: "100px", width: "100px" }} src={`${this.state.img}`} />
                        <input type="file" className="form-control" name='img' id="img"
                         onChange={this.uploadImage}></input>
                        <p style={{display:this.state.errors.length!== 0 ? 'block':'none',color:'red'}}>{this.state.errors.img}</p>
                    </div>
                    <select className="form-select" id="manufacture" aria-label="manufacture">
                    {
                        this.state.manufacture.map(manu=>{
                            return(
                                <option key={manu.id} value={manu.id}>{manu.name}</option>
                            )
                        })
                    }
                    </select>
                    <p style={{display:this.state.errors.length!== 0 ? 'block':'none',color:'red'}}>{this.state.errors.mf_id}</p>
                    <input type="button" value="g???i" onClick={this.SubmitForm}></input>
                </form>  
            </Fragment>

        )
    }
}

export default CreateCar;
