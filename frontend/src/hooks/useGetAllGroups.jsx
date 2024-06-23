import { useState } from "react"
import { API_BASE_URL } from "../config/Routes";
import axios from 'axios';

export const useGetAllGroups = async() => {
    try { 
        const response = await axios.get(`${API_BASE_URL}/groups/get`);
        // console.log(response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        return [];
    }

}