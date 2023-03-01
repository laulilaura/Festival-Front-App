import * as React from 'react';
import imageConnexion from '../picture/familleHome.png';
import Header from './Header';
import Footer from './Footer';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ApiURLAuth } from '../config';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Connexion() {

  const [credentials, setCredentials] = React.useState({
    identifiant: "",
    mdp: ""
  })

  const [erreurForm, setErreurForm] = React.useState(false)

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
      if (!error.response) {
        toast.error("Il est impossible de se connecter actuellement")
      } else {
        switch (error.response.status) {
          case 404:
            toast.error("Il est impossible de se connecter actuellement")
            break;
          case 500:
            setErreurForm(true)
            toast.warning("Identifiant ou mot de passe incorrect")
            break;
          default:
            toast.error("Une erreur est survenue")
            break;
        }
    }
    })
  }

  return (
    <div className="Connexion">
      <Header/>
      <ToastContainer />
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
            error={erreurForm}
            onChange = {handleChange}
          />
          <TextField
            sx={{m: 1}}
            id="standard-mdp"
            label="mot de passe"
            variant="standard"
            name='mdp'
            error={erreurForm}
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
