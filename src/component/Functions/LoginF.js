 
import axios from 'axios';


 const LoginF = async (username,password,setError) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
            Nom: username,
            Mot_Passe: password,
        }, { withCredentials: true });

        return true;

    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message) ;
        } else {
            setError('An error occurred during login.');
        }
        return false;
    }
};
export default LoginF ;