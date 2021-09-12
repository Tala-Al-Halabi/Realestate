import axios, { AxiosResponse } from  'axios';
import { Property } from "../models/property";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Properties = {
    list: () => requests.get<Property[]>('/properties'),
    details: (id: string) => requests.get<Property>(`/properties/${id}`),
    create: (property: Property) => axios.post<void>('/properties', property),
    update: (property: Property) => axios.put<void>(`/properties/${property.id}`, property),
    delete: (id: string) => axios.delete<void>(`/properties/${id}`)
}

const agent = {
    Properties
}

export default agent;