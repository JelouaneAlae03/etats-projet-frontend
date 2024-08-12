import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { "Nom": username, "Mot_Passe" : password });
        if (response.data.success) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log(response.data)
            return response.data.user;
        } else {
            console.log('else')
            throw new Error(response.data.message);
            

        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout`);
        localStorage.removeItem('user');
    } catch (error) {
        throw new Error(error.message);
    }
};
