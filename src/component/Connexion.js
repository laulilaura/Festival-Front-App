import * as React from 'react';
import imageConnexion from '../picture/familleHome.png';
import Header from './Header';
import Footer from './Footer';
import { Box, Button, TextField, Typography } from '@mui/material';

function Connexion() {

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
            Bienvenu sur le site web de FestiFun, le premier festival de jeux pour tous à être pour tous
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
          />
          <TextField
            sx={{m: 1}}
            id="standard-mdp"
            label="mot de passe"
            variant="standard"
          />
          <Button id="Button" variant="contained" sx={{m: 2}}>Connexion</Button>
        </Box>
      </Box>
      <Footer colorBackground="common.white" color="#7ACFB0" />
    </div>
  );
}

export default Connexion;
