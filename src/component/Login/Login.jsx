import React, {useState} from 'react';
import { login } from '../../Auth';
import './Login.css'
import GCLOGO from '../../Assets/images/site-gecimmo.png'
import GCFULLLOGO from '../../Assets/images/GC-logo.png';
import { Key, User } from '@phosphor-icons/react';

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
    
        
        <div className='login-top'>
            <div className="login-header">
                <img src={GCLOGO} alt="GC LOGO" className='img-login-top' />
            </div>
            <div className='login'>
                <div className='container-left'>
                    <div className='container-left-p'>
                        <p id='first'>WELCOME!</p>
                        <p id='second'>TO THE LOGIN PAGE</p>
                    </div>
                    
                </div>
                <div className="container-login">
                    <div className="login-form-container">
                        <div className='p-container'>
                            {/* <img src={GCFULLLOGO} alt="GC LOGO" className='img-login-top' /> */}
                            <p>Authetification</p>
                        </div>
                        
                        <form className="form-login" onSubmit={handleSubmit}>
                            <div className='input-containers'>
                                <User size={32} color='#757575'/>
                                <input type="text" className="email-input" placeholder='Email' onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='input-containers'>
                                <Key size={32} color='#757575'/>
                                <input autoCapitalize="none" type="password" className="email-input" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="input-button">
                                <button type="submit" className='button-login'>S'Identifier</button>
                            </div>
                            {/* <div className="input-block-login">
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
                            </div> */}
                        </form>
                    </div>
                
                </div>
            </div>
        </div>
    
   
  )
}
