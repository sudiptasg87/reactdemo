import Axios from "axios";

import axios from 'axios';

class CheckAppService{
    executeCheckApp(){
        console.log('Service being called');
        return axios.get('http://localhost:8080/legostore/api/check');
    }

}

export default new CheckAppService()