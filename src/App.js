import logo from './picture/jeuLogo.png'
//import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Header from './component/Header';

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

function App() {
  return (
    <div className="App">
      <Header/>
      <img src={logo} className="App-logo" alt="logo" />
      <Box class="form"
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        backgroundColor: 'red',
        width: '40%',
        height: '100%',
        //flexDirection: 'column'
      }}
      >
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
        
    </div>
  );
}

export default App;
