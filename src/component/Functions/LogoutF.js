import axios from "axios";
 const LogoutF = async () => {
    try {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, { withCredentials: true });

        return true;

    } catch (error) {
        console.error('Failed to logout:', error);
        return false;

    }
}
export default LogoutF ;