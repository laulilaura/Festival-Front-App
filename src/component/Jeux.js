import React from 'react';

import Header from './Header';
import Footer from './Footer';
import ListJeux from './ListJeux';

import { Typography, Grid, Box, Button, } from '@mui/material';

import {Link} from 'react-router-dom';

// import des images représentatives des type de jeux
import enfantJeux from '../picture/icons/enfantJeux.png';
import familleJeux from '../picture/icons/familleJeux.png';
import ambianceJeux from '../picture/icons/ambianceJeux.png';
import initieJeux from '../picture/icons/initieJeux.png';
import expertJeux from '../picture/icons/expertJeux.png';

// Import des images de fin de page
import echecPions from '../picture/icons/echecPions.png';
import cartes from '../picture/icons/cartes.png';
import porte from '../picture/icons/porte.png';
import jeuxVideo from '../picture/icons/jeux-video.png';


function Jeux(){
  
  function onClickList(){
    document.getElementById('listeJeux').scrollIntoView({behavior:'smooth'});
  }

  return (
  <div className="Jeux">
    <Header/>
    <Typography variant="h2" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', m:1}}>Jeux</Typography>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb:10}}>
      <Typography variant="h4" m={2}>Impatient.e de connaître notre liste de jeu ?</Typography>
      <Button onClick={onClickList} component={Link} variant="contained" sx={{ alignItems: 'center', backgroundColor:'#F88F52', m:2}}>Aller à la liste de jeux</Button>
    </Box>
      
    <Box id="infosJeux" m={3}>
      <Typography variant="h4" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', m:2}}>En savoir plus sur les types de jeux proposés</Typography>
      {/* Enfant */}
      <Box id="boxEnfant" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', px:5}}>
        <Grid xs={10} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', px:5}}>
          <Typography variant="h3" gutterBottom >Enfant</Typography>
          <Typography variant="h5" gutterBottom >
            Des jeux destinés aux plus jeunes, avec des règles simples et faciles à comprendre.
          </Typography>
          <Typography variant="h6" gutterBottom >
            Ces jeux sont souvent ludiques et éducatifs pour les enfants en bas âge.
          </Typography>
        </Grid>
        <Grid xs={2} sx={{px:5}}>
          <img style={{ height: '100%', width: '100%'}} src={enfantJeux} className="App-logo" alt="enfantJeux" />
        </Grid>
      </Box>

      {/* Famille */}
      <Box id="boxFamille" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', px:5}}>
        <Grid xs={2} sx={{px:5}}>
          <img style={{ height: '100%', width: '100%'}} src={familleJeux} className="App-logo" alt="familleJeux" />
        </Grid>
        <Grid xs={10} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', px:5}}>
          <Typography variant="h3" gutterBottom >Famille</Typography>
          <Typography variant="h5" gutterBottom >
              Des jeux accessibles pour tous les membres de la famille, des plus jeunes aux plus âgés.
          </Typography>
          <Typography variant="h6" gutterBottom >
              Ces jeux sont souvent amusants et conviviaux pour les moments de partage en famille.
          </Typography>
        </Grid>
      </Box>

      {/* Ambiance */}
      <Box id="boxAmbiance" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', px:5}}>
        <Grid xs={10} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', px:5}}>
          <Typography variant="h3" gutterBottom >Ambiance</Typography>
          <Typography variant="h5" gutterBottom >
            Des jeux qui mettent l'accent sur l'ambiance et l'interaction entre les joueurs, avec des règles simples mais des objectifs variés. 
          </Typography>
          <Typography variant="h6" gutterBottom >
            Ces jeux sont souvent propices aux moments de rigolade et d'échange.
          </Typography>
        </Grid>
        <Grid xs={2} sx={{px:5}}>
          <img style={{ height: '100%', width: '100%'}} src={ambianceJeux} className="App-logo" alt="ambianceJeux" />
        </Grid>
      </Box>

      {/* Initié */}
      <Box id="boxInitie" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', px:5}}>
        <Grid xs={2} sx={{px:5}}>
          <img style={{ height: '100%', width: '100%'}} src={initieJeux} className="App-logo" alt="initieJeux" />
        </Grid>
        <Grid xs={10} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', px:5}}>
          <Typography variant="h3" gutterBottom >Initié</Typography>
          <Typography variant="h5" gutterBottom >
            Des jeux pour les joueurs ayant une certaine expérience dans le monde du jeu, avec des règles plus complexes et une stratégie plus élaborée.
          </Typography>
          <Typography variant="h6" gutterBottom >
            Ces jeux demandent une certaine réflexion et une analyse de la situation pour espérer l'emporter.
          </Typography>
        </Grid>
      </Box>

      {/* Expert */}
      <Box id="boxExpert" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', px:5}}>
        <Grid xs={10} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', px:5}}>
          <Typography variant="h3" gutterBottom >Expert</Typography>
          <Typography variant="h5" gutterBottom >
            Des jeux pour les joueurs expérimentés et passionnés, avec des règles très complexes et une grande profondeur de jeu.
          </Typography>
          <Typography variant="h6" gutterBottom >
            Ces jeux requièrent une grande maîtrise des règles et des mécaniques de jeu pour espérer remporter la victoire.
          </Typography>
        </Grid>
        <Grid xs={2} sx={{px:5}}>
          <img style={{ height: '100%', width: '100%'}} src={expertJeux} className="App-logo" alt="expertJeux" />
        </Grid>
      </Box>

    </Box>
    <div id="listeJeux"><ListJeux sx={{m:15}} /> </div>
    

    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Grid xs={3}><img style={{ maxWidth: '30%', maxHeight: '30%' }} src={echecPions} className="App-logo" alt="echecPions" /></Grid>
      <Grid xs={3}><img style={{ maxWidth: '30%', maxHeight: '30%' }} src={cartes} className="App-logo" alt="cartes" /></Grid>
      <Grid xs={3}><img style={{ maxWidth: '30%', maxHeight: '30%' }} src={porte} className="App-logo" alt="porte" /></Grid>
      <Grid xs={3}><img style={{ maxWidth: '30%', maxHeight: '30%' }} src={jeuxVideo} className="App-logo" alt="jeuxVideo" /></Grid>
    </Box>
    <Footer colorBackground="common.white" color="#7ACFB0" />

  </div>
  );
}

export default Jeux;