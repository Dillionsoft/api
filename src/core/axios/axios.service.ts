import axios, { AxiosInstance } from "axios";



export abstract class AxiosService{

    instance: AxiosInstance
    baseURL:string

    constructor(
        private baseUrl:string, 
        private readonly header:object){
            this.baseURL = baseUrl

            this.instance = axios.create({
                baseURL:baseUrl,
                headers:header
            })
    }
}