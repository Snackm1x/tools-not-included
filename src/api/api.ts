import axios from 'axios';

export default axios.create({
    //baseURL: process.env.NODE_ENV === "production" ? 'https://oni-seed-browser-api.herokuapp.com/api/' : 'http://localhost:50164/api/'
    baseURL: 'https://oni-seed-browser-api.herokuapp.com/api/'
});