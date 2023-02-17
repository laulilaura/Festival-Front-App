import * as React from 'react';
import imageHome from './picture/familleHome.png'
import Header from './component/Header';
//import './App.css';
//import {Link} from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

/*
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});
*/

function App() {

  return (
    <div className="App">
      <Header/>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height:'100%', width:'100%'}}>
        <Box
        sx={{
          display: 'flex', 
          flexDirection: 'column',
          width: '40%',
          height: '100%'
        }}>
          <img style={{ height: '100%'}} src={imageHome} className="App-logo" alt="imageHome" />
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
          width: '40%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <Typography variant="h3" gutterBottom>
            Connexion
          </Typography>
          <TextField
          id="standard-email"
          label="e-mail"
          variant="standard"
          />
          <TextField
            id="standard-mdp"
            label="mot de passe"
            variant="standard"
          />
          <Button id="Button" variant="contained">Connexion</Button>
        </Box>
      </Box>
    </div>
  );
}

export default App;
