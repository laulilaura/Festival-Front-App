import * as React from 'react';
import imageConnexion from '../picture/familleHome.png';
import Header from './Header';
import Footer from './Footer';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ApiURLAuth } from '../config';
import axios from 'axios';

function Connexion() {

  const [credentials, setCredentials] = React.useState({
    identifiant: "",
    mdp: ""
  })

  const handleChange = ({currentTarget}) => {
    setCredentials({
      ...credentials,
      [currentTarget.name]: currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post(ApiURLAuth + '/login', {mailAdmin: credentials.identifiant, mdpAdmin: credentials.mdp})
    .then(response => {
      Window.localStorage.setItem('token', response.data.token)
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  return (
    <div className="Connexion">
      <Header/>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height:'100%', width:'100%', mt:5}}>
        <Box
        sx={{
          display: 'flex', 
          flexDirection: 'column',
          width: '40%',
          height: '100%'
        }}>
          <img style={{ height: '100%'}} src={imageConnexion} className="App-logo" alt="imageHome" />
          <Typography variant="h2" gutterBottom sx={{display: 'flex',justifyContent: 'center'}}>
            FestiFun
          </Typography>
          <Typography variant="h4" gutterBottom>
            Bienvenue sur le site web de FestiFun, le premier festival de jeux pour tous à être pour tous
          </Typography>
          
        </Box>
        
        <Box className="form"
        sx={{
          display: 'flex', 
          bgcolor: 'background.paper',
          boxShadow: 2,
          borderRadius: 2,
          p: 2,
          width: '30%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 3
        }}
        >
          <Typography variant="h3" sx={{m: 1}} gutterBottom>
            Connexion
          </Typography>
          <TextField
            sx={{m: 1}}
            id="standard-email"
            label="e-mail"
            variant="standard"
            name='identifiant'
            onChange = {handleChange}
          />
          <TextField
            sx={{m: 1}}
            id="standard-mdp"
            label="mot de passe"
            variant="standard"
            name='mdp'
            onChange = {handleChange}
          />
          <Button id="Button" type='submit' onClick={handleSubmit} variant="contained" sx={{m: 2}}>Connexion</Button>
        </Box>
      </Box>
      <Footer colorBackground="common.white" color="#7ACFB0" />
    </div>
  );
}

export default Connexion;
