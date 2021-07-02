import axiosClient from './axios'

class ManuApi {
    getAll = () => {
    const url = `/manufacture`;
    return axiosClient.get(url);
    };
    getOne = (id) => {
        const url = `/manufacture/${id}`;
        return axiosClient.get(url)
    };
    getOneWithManu = (id) => {
        const url = `manufacture/manu/${id}`;
        return axiosClient.get(url)
    };
    
    post = (data) =>{
        const url = `/manufacture`;
        return axiosClient.post(url,data)
    }
    put = (data,id) =>{
        const url  = `/manufacture/${id}`;
        return axiosClient.put(url,data)
    };
    delete = (id) =>{
        const url  = `/manufacture/${id}`;
        return axiosClient.delete(url)
    }
    }
    const ManuAPI = new ManuApi();
export default ManuAPI;