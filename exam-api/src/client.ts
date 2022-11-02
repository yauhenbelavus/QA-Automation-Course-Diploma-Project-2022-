import { METHODS } from "../support/types";
import axios from "axios";
import { requestDataType } from "../support/types";

export class Client {
    constructor() {}
  
public async request(method: METHODS, data: requestDataType) {
     const {url, body, headers} = data;
  
     switch(method) {
        case METHODS.GET:
            return axios.get(url, { headers });
        case METHODS.POST:
            return axios.post(url, body, { headers });
        case METHODS.PUT:
            return axios.put(url, body, { headers });
        case METHODS.PATCH:
            return axios.patch(url, body, { headers });
        case METHODS.DELETE:
            return axios.delete(url, { headers });
        default:
            throw new Error('Use valid request method')
          }
     }
} 