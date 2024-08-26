import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import './UserDetails.css'
export const UserDetails = () => {
    const [user, setUser] = useState(null); // Use null to indicate no user data yet
    const { id } = useParams();
    const [nom,setNom] = useState('');
    const [nomC,setNomC] = useState('');
    const [description,setDescription] = useState('');
    const [password,setPassword] = useState('');
    const [desactiver,setDesactiver] = useState('');
    const [message,setMessage] = useState('');
    const [error,setError] = useState('');
    const GetUserDetails = async () => {
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
    const ChangeUserDetails = async () => {
        try {
          const response = await axios.put(
            `http://127.0.0.1:8000/api/users/user/${id}`,
            {
              Nom: nom,
              NomC: nomC,
              Description: description,
              Password: password,
              Desactiver: desactiver
            },
            {
              withCredentials: true, 
            }
          );
          console.log('User updated:', response.data);
          setMessage(response.data.message);
        } catch (error) {
          console.error('Error updating user:', error.response.data);
          setError(error.response.data)
        }
      };

    useEffect(() => {
        console.log(id);
        GetUserDetails();
    }, [id]);
    useEffect(() => {
        if (user) {
            const singleUser = user[0]; 
            setNom(singleUser.Nom);
            setNomC(singleUser.Nom_Complet);
            setDescription(singleUser.Description);
            setPassword(singleUser.Mot_Passe);
            setDesactiver(singleUser.Compte_Desactive);
        }
    }, [user]);
    const handleCheckboxChange = (event) => {
        if (event.target.checked){
            setDesactiver("1");
        }
        else{
            setDesactiver("0");
        }
      };


    useEffect(()=>{
        console.log(user);
    },[user])
    useEffect(()=>{
        console.log('desactiver: '+ desactiver);
    },[desactiver])


    if (!user) {
        return <Loading />;

    }
  return (
    <>
        <div>
            <div>

                <div class="form-container" >
                    <div class="logo-container">
                        User Details
                    </div>

                    <div className="form">
                        <div className="form-group">
                        <label for="Nom">Nom</label>
                        <input type="text" id="Nom" name="Nom" value={nom} onChange={(e)=>{setNom(e.target.value)}} />
                        </div>
                        <div className="form-group">
                        <label for="NomC">Nom Complet</label>
                        <input type="text" id="NomC" name="NomC" value={nomC} onChange={(e)=>{setNomC(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label for="Description">Description</label>
                            <select name="" id="" value={description} onChange={(e)=>{setDescription(e.target.value)}}>
                                <option value="Administrateur">Administrateur</option>
                                <option value="Responsable commercial">Responsable commercial</option>
                                <option value="Management IS">Management IS</option>
                                <option value="Commission" >Commission</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="password">Mot de passe</label>
                            <input type="password" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className="form-groupCheckbox">
                            <label for="checkbox">Désactiver le compte: </label>
                            <input type="checkbox" id="checkbox" name="checkbox" checked={desactiver === "1"} onChange={(event)=>handleCheckboxChange(event)} />
                        </div>


                        <button className="form-submit-btn" type="submit" onClick={()=>ChangeUserDetails()}>confirmer</button>
                    </div>
                    <div>
                        <p className='p-success'>{message && message}</p>
                        <p className='p-failed'>{error && error}</p>

                    </div>
                    </div>


            </div>
        </div>
    </>
  )
}
