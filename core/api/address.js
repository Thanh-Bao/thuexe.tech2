import axios from "axios";
import { API_URL } from "../config";

export function getProvinces() {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/provinces`, {
        }).then(response => {
            resolve(response.data);
        }).catch(error => reject(error))
    })
}

export function getDistricts(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/provinces/${id}/districts`, {
        }).then(response => {
            resolve(response.data);
        }).catch(error => reject(error))
    })
}

export function getWards(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/districts/${id}/wards`, {
        }).then(response => {
            resolve(response.data);
        }).catch(error => reject(error))
    })
}

export function getProvince(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/provinces/${id}`, {
        }).then(response => {
            resolve(response.data);
        }).catch(error => reject(error))
    })
}

export function getDistrict(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/districts/${id}`, {
        }).then(response => {
            resolve(response.data);
        }).catch(error => reject(error))
    })
}

export function getWard(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/wards/${id}`, {
        }).then(response => {
            resolve(response.data);
        }).catch(error => reject(error))
    })
}

