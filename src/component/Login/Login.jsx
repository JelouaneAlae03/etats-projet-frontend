import React, {useState} from 'react';
import { login } from '../../Auth';
import './Login.css'
import GCLOGO from '../../Assets/images/GC-logo.png'
import GCFULLLOGO from '../../Assets/images/fullLogo.jpg';

export const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(username, password);
            onLogin(user); 
        } catch (err) {
            setError(err.message);
        }
    };

  return (
    <div className='login'>
        <div className="container-login">
            <div className="right-login">
                <div className="img-login-container">
                    <img src={GCLOGO} alt="GC LOGO" className='img-login' />
                    <p>Avez-vous pas de compte?</p>
                    <button>S'Enregistrer</button>
                </div>
            </div>
            <div className="left-login">
                <div>
                    <img src={GCFULLLOGO} alt="GC LOGO" className='img-login' />
                </div>
                <form className="form-login" onSubmit={handleSubmit}>
                    <div className="input-block-login">
                        <input className="input-login" type="text" id="email" required="" onChange={(e) => setUsername(e.target.value)}/>
                        <label for="email"className='label-login'>Username</label>
                    </div>
                    <div className="input-block-login">
                        <input className="input-login" type="password" id="pass" required=""  onChange={(e) => setPassword(e.target.value)} />
                        <label for="pass" className='label-login'>Password</label>
                    </div>
                    <div className="input-block-login">
                        <span className="forgot-login"><a href="#">Forgot Password?</a></span>
                        <button type="submit" className='button-login'>S'Identifier</button>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
   
  )
}
