import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === "production" ? 'https://api.toolsnotincluded.net/api/' : 'http://localhost:3005/api/'
});
