import axios from 'axios';
import { toast } from 'react-toastify';
const baseURL = 'https://geo-data-app-service.onrender.com';

export const register = async (fullName, email, password, avatar) => {
    try {
        let response = await axios.post(`${baseURL}/api/auth/register`, {
            fullName: fullName,
            email: email,
            password: password,
        });

        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const signIn = async (email, password) => {
    try {
        let response = await axios.post(`${baseURL}/api/auth/login`, {
            email: email,
            password: password
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getUser = async (email) => {
    try {
        let response = await axios.get(`${baseURL}/api/users/${email}`);
        return response.data;
    } catch (err) {
        console.log(err);
        toast('Some error occured while getting user!');
    }
}

