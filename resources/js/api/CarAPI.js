import axiosClient from './axios'

class CarsApi {
    getAll = () => {
    const url = `/cars`;
    return axiosClient.get(url);
    };
    getOne = (id) => {
        const url = `/cars/${id}`;
        return axiosClient.get(url)
    };
    getOneWithManu = (id) => {
        const url = `cars/manu/${id}`;
        return axiosClient.get(url)
    };
    searchCar = (data)=>{
        const url = `/cars/search`;
        return axiosClient.post(url,data)
    }
    post = (data) =>{
        const url = `/cars`;
        return axiosClient.post(url,data)
    }
    putInPost = (data,id) =>{
        const url  = `/cars/${id}`;
        return axiosClient.post(url,data)
    };
    put = (data,id) =>{
        const url  = `/cars/${id}`;
        return axiosClient.put(url,data)
    };
    delete = (id) =>{
        const url  = `/cars/${id}`;
        return axiosClient.delete(url)
    }
    }
    const CarsAPI = new CarsApi();
export default CarsAPI;

