import axios from "axios";

const GetUserDroits = async (id, setUserDroits) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/droits/getalluserdroits",
      {
        params: { NumUtilisateur: id },
        withCredentials: true,
      }
    );
    // alert("xxxxx" + JSON.stringify(response.data));
    setUserDroits(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching user details:", err.response ? err.response.data : err.message);
    if (err.response && err.response.data && err.response.data.message) {
      return "Token Error";
    } else {
      return "An unexpected error occurred";
    }
  }
};

export default GetUserDroits;