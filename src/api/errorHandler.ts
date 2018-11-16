import { AxiosError } from 'axios';
import { History } from 'history';
import ComponentURL from 'src/constants/ComponentURL';

export default function handleError(error: AxiosError, history: History) {
    if (error.response && (error.response.status == 404 || error.response.status == 400)) {
        history.replace(ComponentURL.Error404);
    }
    if (error.message == "Network Error") {
        //todo
    }
}