import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import GCLOGO from '../../Assets/images/site-gecimmo.png';
import { Key, User } from '@phosphor-icons/react';

export const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [log, setLog] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                Nom: username,
                Mot_Passe: password,
            }, { withCredentials: true });
            navigate('/');

            const success = response.data;
            setLog(success);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred during login.');
            }
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
                            <p>Authentication</p>
                        </div>
                        <form className="form-login" onSubmit={handleSubmit}>
                            <div className='input-containers'>
                                <User size={32} color='#757575' />
                                <input
                                    type="text"
                                    className="email-input"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                            </div>
                            <div className='input-containers'>
                                <Key size={32} color='#757575' />
                                <input
                                    type="password"
                                    className="email-input"
                                    placeholder="Mot de passe"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            <div className="input-button">
                                <button type="submit" className='button-login'>
                                    S'Identifier
                                </button>
                            </div>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
