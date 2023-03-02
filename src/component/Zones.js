import * as React from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";

import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Grid,
  Link,
  Button,
} from "@mui/material";

// import des images représentatives
import chapiteauZone from "../picture/icons/chapiteauZone.png";
import prochain from "../picture/icons/prochain.png";

const baseURLGETZones = "http://localhost:3000/zone/";

function Zones() {
  const [zones, setZones] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(baseURLGETZones)
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
      <Header />

      <Typography
        variant="h2"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 1,
        }}
      >
        Zones
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 10,
        }}
      >
        <Typography variant="h4" m={2}>
          Impatient.e de connaître notre liste de zone ?
        </Typography>
        <Button
          component={Link}
          to="#sectionList"
          variant="contained"
          sx={{ alignItems: "center", backgroundColor: "#F88F52", m: 2 }}
        >
          Aller à la liste de zones
        </Button>
      </Box>

      <Box
        id="boxAvantage"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          px: 5,
        }}
      >
        <Grid
          xs={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 5,
          }}
        >
          <Typography variant="h4" sx={{ my: 2 }} gutterBottom>
            Avantage
          </Typography>
          <Typography variant="h6" gutterBottom>
            Nous sommes ravis de vous présenter les différentes zones de jeux du
            FestiFun ! Notre festival propose plusieurs zones, chacune avec une
            sélection unique de jeux amusants pour tous les âges et tous les
            niveaux de compétence. Que vous soyez un joueur débutant ou un
            joueur chevronné, il y en aura pour tous les goûts !
          </Typography>
          <Typography variant="h6" gutterBottom mt={2}>
            Chaque zone sera gérée par des bénévoles dévoués qui veilleront à ce
            que les joueurs puissent s'amuser en toute sécurité et profiter
            pleinement de leur expérience de jeu. Les visiteurs pourront
            s'inscrire sur place à des créneaux pour jouer à leurs jeux préférés
            et s'assurer ainsi d'avoir un temps de jeu garanti.
          </Typography>
        </Grid>
        <Grid xs={2} sx={{ px: 5 }}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={chapiteauZone}
            className="App-logo"
            alt="chapiteauZone"
          />
        </Grid>
      </Box>

      <Typography
        variant="h3"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 5,
        }}
      >
        Liste des zones disponibles
      </Typography>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 0,
          p: 5,
        }}
      >
        <List>
          {zones.map((zone) => (
            <Box
              key={zone._id}
              style={{
                mb: 3,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                bgcolor: "background.paper",
                boxShadow: 2,
                borderRadius: 2,
                p: 2,
              }}
            >
              <Grid
                xs={6}
                sx={{ px: 5, display: "flex", flexDirection: "row" }}
              >
                <img src={prochain} className="App-logo" alt="prochain" />
                <Typography variant="h4"> {zone.nomZone}</Typography>
              </Grid>
              <Grid
                xs={6}
                sx={{
                  display: "inline-flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <ListItem
                  sx={{ mb: 3, display: "flex", flexDirection: "column" }}
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Jeux proposés dans cette zone :
                    </Typography>
                    {zone.jeux.length === 0 ? (
                      <Box>
                        <Typography>
                          Pour le moment aucun jeu n'est affecté à cette zone...
                        </Typography>
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
              </Grid>
            </Box>
          ))}
        </List>
      </Grid>
      <Footer colorBackground="common.white" color="#7ACFB0" />
    </div>
  );
}

export default Zones;
