import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === "production" ? 'http://51.68.214.168/api/' : 'http://localhost:50164/api/'
    //baseURL: 'http://51.68.214.168/api/'
});
