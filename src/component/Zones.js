import * as React from 'react';
import axios from "axios";

import Header from './Header';

import { Typography,Box , List, ListItem, ListItemText, Grid} from '@mui/material';


const baseURLGETZones = "http://localhost:3000/zone/";

function Zones(){

    const [zones, setZones] = React.useState([]);

    React.useEffect(() => {
    axios.get(baseURLGETZones)
        .then((response) => {
        setZones(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
    }, []);

    if (!Array.isArray(zones)) return null; // Vérification de la variable zones
    
    return (
        <div className="Zones">
            <Header/>
            <Grid container spacing={2} sx={{height:'100%', width:'100%',  display: 'flex', flexDirection: 'column', alignItems: 'center', m:0, p:0}}>
                <Typography variant="h2" m={1}>Liste des zones disponibles</Typography>
                <List>
                {zones.map((zone) => (
                    <Box key={zone._id} style={{ mb:3, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4" m={0}>{zone.nomZone}</Typography>
                        <ListItem>
                            <Box>
                            <Typography variant="h6" gutterBottom>Jeux proposés dans cette zone :</Typography>
                            {zone.jeux.length === 0 ? (
                                <Box>
                                    <Typography>Pour le moment aucun jeu n'est affecté à cette zone...</Typography>
                                    <Typography>Reviens plus tard !</Typography>
                                </Box>
                                ) : (
                                <Box>
                                {zone.jeux.map((jeu) => (
                                    <ListItemText key={jeu._id}>
                                        {jeu.nomJeu} ({jeu.typeJeu})
                                    </ListItemText>
                                ))}
                                </Box>
                            )}
                            </Box>
                        </ListItem>
                    </Box>
                ))}
                </List>
            </Grid>
        </div>
      );
}

export default Zones;