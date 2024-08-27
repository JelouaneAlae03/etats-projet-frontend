import axios from "axios";
const GetUserDetails = async (id,setUser) => {
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/users/userdetails',
            { Cle : id }, 
            { withCredentials: true }
        );
        setUser(response.data);
        
    } catch (err) {
        
        console.error('Error fetching user details:', err);
        
    }
};
export default GetUserDetails;