import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CarsAPI from '../api/CarAPI';
import ManuAPI from '../api/ManuAPI';
class CarList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cars: [],
            car:{},
            manufacture:[],
            mess:false,
            searchTerm:"",
            arr:[]
        }
    }
    searchCar=()=>{
        let arr=this.state.cars
            .filter((car) => {
              if (this.state.searchTerm === "") {
                return null;
              } else if (
                car.name
                  .toLowerCase()
                  .includes(this.state.searchTerm.toLowerCase()) 
              ) {
                return car;
              }
            })
       this.setState({arr:arr})
    }
    
    getAllManu = () => {
        ManuAPI
        .getAll()
        .then((res)=>{
            this.setState({manufacture:res})
        })
        .catch((err)=>{})
    }
    getAllCars = () => {
        CarsAPI.getAll()
            .then((res) => {
                this.setState({ cars: res })
            })
            .catch((err) => { })
    }
    deleteCar = (id) =>{
        CarsAPI
        .delete(id)
        .then((res)=>{
        console.log(res.message );
          this.getAllCars();
        })
        .catch((err)=>{})
    }
    onChangeHandle=(e)=>{
      
        this.setState({[e.target.name]:e.target.value})
    
}
    logout = () =>{
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/logout',
          })
          .then(res=>{
            console.log(res.data.status);
            if(res.data.status == "success"){
                this.props.history.push('/login')
            }
          }).catch(err=>{

          });
    }
    componentDidMount() {
        this.getAllCars()
        this.getAllManu()
    }
    render() {
        return (
            <Fragment>
                {/* <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></input> */}
                <button onClick={()=>this.logout()} className="btn btn-success my-4">Đăng xuất</button >
                 <Link to="/cars/create" className="btn btn-success my-4">Thêm</Link >
                 <div className="input-group mb-3">
                 <input type="text" className="form-control mr-2" id="search" name="searchTerm" onChange={this.onChangeHandle}></input>
                 <button type="button" className="btn btn-primary" onClick={()=>this.searchCar()}>search</button>
                 </div>
                 
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">model</th>
                            <th scope="col">img</th>
                            <th scope="col">manufacture</th>
                            <th scope="col" colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{display:this.state.arr.length==0?"none":"table-row-group"}}>
                        {
                            this.state.arr.map((car,index) => {
                                return(
                                    this.state.manufacture.map((manu) =>{
                                        if(car.mf_id === manu.id){
                                            
                                            return (
                                                <tr key={car.id}>
                                                    <td scope="row">{++index}</td>
                                                    <td>{car.name}</td>
                                                    <td>{car.model}</td>
                                                    <td><img style={{ height: "60px", width: "60px" }} 
                                                    src={`images/${car.img}` }/></td>
                                                    <td>{manu.name}</td>
                                                    <td>
                                                        <Link className="btn btn-primary mr-3" to={`/cars/${car.id}/edit`}> Edit </Link>
                                                        <button type="button" className="btn btn-danger"
                                                        onClick={()=>this.deleteCar(car.id)}>Del</button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                     })   
                                )
                            })
                        }

                    </tbody>
                    <tbody style={{display:this.state.arr.length==0?"table-row-group":"none"}}>
                        {
                            this.state.cars.map((car,index) => {
                                return(
                                    this.state.manufacture.map((manu) =>{
                                        if(car.mf_id === manu.id){
                                            
                                            return (
                                                <tr key={car.id}>
                                                    <td scope="row">{++index}</td>
                                                    <td>{car.name}</td>
                                                    <td>{car.model}</td>
                                                    <td><img style={{ height: "60px", width: "60px" }} 
                                                    src={`images/${car.img}` }/></td>
                                                    <td>{manu.name}</td>
                                                    <td>
                                                        <Link className="btn btn-primary mr-3" to={`/cars/${car.id}/edit`}> Edit </Link>
                                                        <button type="button" className="btn btn-danger"
                                                        onClick={()=>this.deleteCar(car.id)}>Delete </button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                     })   
                                )
                            })
                        }
                    </tbody>
                </table>
            </Fragment>

        );
    }
}

export default CarList;
