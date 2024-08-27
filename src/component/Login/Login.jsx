import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import GCLOGO from '../../Assets/images/site-gecimmo.png';
import { Key, User } from '@phosphor-icons/react';
import LoginF from '../Functions/LoginF';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginSuccess = await LoginF(username, password, setError);
        if (loginSuccess) {
            navigate('/', { state: { successMessage: 'Login successful!' } });
        }
    };
    useEffect(() => {
        if (error) {
            NotificationManager.error(error, 'Erreur', 3000);
        }
        setError("");
    }, [error]); // Trigger notification when error state changes
    useEffect(()=>{
        const hasNotificationBeenShown = localStorage.getItem('notificationShown');
        console.log("local storage", hasNotificationBeenShown);
    },[])
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
                        <form className="form-login" onSubmit={handleLogin}>
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
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </div>
    );
};
