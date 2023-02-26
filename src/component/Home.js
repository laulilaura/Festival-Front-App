import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
// images
import imageHome from '../picture/familleHome2.png';
import imageJeux from '../picture/icons/scrabble.png';
import imageZones from '../picture/icons/espace-reserve.png';

import Grid from '@mui/system/Unstable_Grid';
import { Button, Typography } from '@mui/material';

import {Link} from 'react-router-dom';

function Home(){
    return (
    <div className="Home">
        <Header/>
        <Grid container spacing={2} sx={{height:'100%', width:'100%',  display: 'flex', m:0, p:0}}>
          <Grid xs={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px:10, backgroundColor:'#7ACFB0'}}>
            <Typography variant="h2" gutterBottom sx={{display: 'flex',justifyContent: 'center'}}>
                FestiFun
            </Typography>
            <Typography variant="h4" gutterBottom>
              Bienvenue à FestiFun : Le festival de jeux le plus amusant de l'année !
            </Typography>
            <Typography variant="h5" gutterBottom>
              Le festival à lieu le 11 et 12 mars au Parc des Expositions de Montpellier
            </Typography>
          </Grid>
          <Grid xs={7} sx={{px:5, backgroundColor:'#7ACFB0'}}>
            <img style={{ height: '100%', width: '100%'}} src={imageHome} className="App-logo" alt="imageHome" />
          </Grid>

          <Grid xs={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', px:5,  background: 'linear-gradient(to top, white 30%, #7ACFB0 10%)'}}>
            <Typography variant="h4" gutterBottom> Tu es bénévole sur le festival ?</Typography>
            <Button id="buttonBenevoles" variant="contained" sx={{m: 2, backgroundColor:'#F88F52'}} component={Link} to="/benevoles"> Liste d'affectation </Button>
          </Grid>

          <Grid xs={6} sx={{px:5, backgroundColor:'white'}}>
            <img style={{ height: '100%', width: '100%'}} src={imageJeux} className="App-logo" alt="imageJeux" />
          </Grid>
          <Grid xs={6} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px:5, backgroundColor:'white' }}>
            <Typography variant="h2" gutterBottom sx={{display: 'flex',justifyContent: 'center'}}>
                Nos jeux
            </Typography>
            <Typography variant="h4" gutterBottom>
                Le festival propose tout type de jeux, venez les découvrir !
            </Typography>
            <Button id="buttonJeux" variant="contained" sx={{m: 2, backgroundColor:'#F88F52'}} component={Link} to="/jeux"> Liste de nos jeux </Button>
          </Grid>

          <Grid xs={8} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px:5, backgroundColor: '#00BDC8'}}>
            <Typography variant="h2" gutterBottom sx={{display: 'flex',justifyContent: 'center'}}>
                Zones
            </Typography>
            <Typography variant="h4" gutterBottom>
                Pleins de zones sur le festival
            </Typography>
            <Button id="buttonJeux" variant="contained" sx={{m: 2, backgroundColor:'#F88F52'}} component={Link} to="/zones"> Liste de nos zones </Button>
          </Grid>
          <Grid xs={4} sx={{px:5, backgroundColor: '#00BDC8'}}>
            <img style={{ height: '100%', width: '100%'}} src={imageZones} className="App-logo" alt="imageZones" />
          </Grid>
        </Grid>
        <Footer colorBackground="#00BDC8" color="common.white"/>
    </div>
    );
}

export default Home;