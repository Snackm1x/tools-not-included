import {AxiosError} from 'axios';
import * as H from 'history';

export default function handleError (error: AxiosError, history: H.History) {
    if (error.response && (error.response.status == 404 || error.response.status == 400)) {
        history.replace("/404");
    }
    if (error.message == "Network Error") { 
        //todo
    }
}