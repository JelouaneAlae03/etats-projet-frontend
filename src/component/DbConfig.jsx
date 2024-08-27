import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading'
const DbConfig = () => {
  const [config, setConfig] = useState([]);
  const [newConfig, setNewConfig] = useState([]);

  const GetDbInfo = async () =>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/configuration/database',{},{
            withCredentials: true
        })
        setConfig(response.data);

    }
    catch(err){
        console.log(err)
    }
}
const updateDbConfig = async () =>{
  try {
      const response = await axios.post('http://127.0.0.1:8000/api/configuration/update-database',{newConfig},{
          withCredentials: true
      })
      window.location.reload();
  }
  catch(err){
      console.log(err)
  }
}
    useEffect(()=>{
      GetDbInfo();
    },[])
    useEffect(()=>{
      setNewConfig(config);
    },[config])
    useEffect(()=>{
      console.log(newConfig)
    },[newConfig])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Config:', config);
  };

  if (config.length === 0) {
    return <Loading />
  }

  return (
    <>        
      <form onSubmit={handleSubmit} style={styles.form}>
      {Object.keys(config).map((key) => (
          <div key={key} style={styles.inputGroup}>
          <label style={styles.label}>{key}</label>
          <input
              type="text"
              name={key}
              value={config[key]}
              onChange={(e)=>{handleInputChange(e)}}
              style={styles.input}          />
          </div>
      ))}
      <button
        type="submit"
        style={{
          ...styles.button, // Apply existing styles
          backgroundColor: newConfig.length === 0 ? 'grey' : '#007bff',
          cursor: newConfig.length === 0 ? 'not-allowed' : 'pointer', // Optionally change the cursor when disabled
        }}
        disabled={newConfig.length === 0}
        onClick={()=>{updateDbConfig()}}
      >
        Sauvegarder Configuration
      </button>      
</form>
    </>
    
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: 'auto',
    marginTop: '20px'
  },

  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DbConfig;
