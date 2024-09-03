import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const Error = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>404</h1>
            <p style={styles.message}>Oups! La page que vous recherchez n'existe pas.</p>
            <Link to="/" style={styles.button}>
                Retourner à l'accueil
            </Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa', 
        color: '#343a40', 
        textAlign: 'center',
    },
    header: {
        fontSize: '10rem',
        fontWeight: 'bold',
        margin: 0,
    },
    message: {
        fontSize: '1.5rem',
        margin: '20px 0',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1.2rem',
        color: '#fff',
        backgroundColor: '#007bff', // Bootstrap primary color
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
};

export default Error;
