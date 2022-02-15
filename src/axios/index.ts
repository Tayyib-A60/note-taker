import axios from "axios";

const instance = axios.create({
    baseURL: 'http://35.178.213.142:4001/api/'
});

export default instance;