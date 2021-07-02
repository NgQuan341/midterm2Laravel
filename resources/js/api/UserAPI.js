import axiosClient from './axios'

class UserApi {
    getAll = () => {
    const url = `/cars`;
    return axiosClient.get(url);
    };
    getOne = (id) => {
        const url = `/cars/${id}`;
        return axiosClient.get(url)
    };
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
    const UserAPI = new UserApi();
export default UserAPI;

