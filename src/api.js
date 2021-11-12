import axios from 'axios';

const API_URL = "http://localhost:5001/";

export const getGroups =  async () => {
    const response = await axios.get(`${API_URL}group/groups`);
    return response.data;
}

export const saveNewGroup = async (group) => {
    const response = await axios.post(`${API_URL}group/groups`, group);
    return response.data;
}

export const saveNewArticle = async (article) => {
    const response = await axios.post(`${API_URL}article`, article);
    return response.data;
}