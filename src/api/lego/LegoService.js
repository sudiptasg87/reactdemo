import axios from 'axios';

class LegoService{

    retrieveAllLegoSets(){
        console.log('Legoset Service being called');
        return axios.get('http://localhost:8080/legostore/api/all');
    }

}

export default new LegoService()