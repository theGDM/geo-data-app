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

export const createGeoJson = async (userId, title, description, geoData) => {
    let body = {
        userId: userId,
        title: title,
        description: description,
        geoData: geoData
    }

    try {
        let response = await axios.post(`${baseURL}/api/geojsons/${userId}`, body);
        toast('GeoJson created successfully!');
    } catch (err) {
        console.log(err);
        toast('Some error occured while creating the GeoJson!');
    }
}

export const updateGeoJson = async (geoJsonId, body) => {
    try {
        let response = await axios.put(`${baseURL}/api/geojsons/${geoJsonId}`, body);
        toast('GeoJson updated successfully!');
    } catch (err) {
        console.log(err);
        toast('Some error occured while updating the GeoJson!');
    }
}

export const deleteGeoJson = async (geoJsonId) => {
    try {
        let response = await axios.delete(`${baseURL}/api/geojsons/${geoJsonId}`);
        toast('GeoJson deleted successfully created!');
    } catch (err) {
        console.log(err);
        toast('Some error occured while deleting the GeoJson data!');
    }
}


export const getAllGeoJson = async (userId) => {
    try {
        let response = await axios.get(`${baseURL}/api/geojsons/${userId}/geojsons`);
        return response;
    } catch (err) {
        console.log(err);
        toast('Some error occured while getting the GeoJsons!');
    }
}

