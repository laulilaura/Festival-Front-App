import * as React from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import ListBenevoles from "./ListBenevoles";

import { Link } from "react-router-dom";

import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { ApiURLBenevole } from "../config";

// import des images représentatives
import benevolesImage from "../picture/icons/benevole.png";
import candidatImage from "../picture/icons/candidat.png";
import avantageImage from "../picture/icons/avantage.png";

export default function Benevoles() {

  function onClickList(){
    document.getElementById('listeBenevoles').scrollIntoView({behavior:'smooth'});
  }


  const [benevoles, setBenevoles] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(ApiURLBenevole)
      .then((response) => {
        setBenevoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!Array.isArray(benevoles)) return null; // Vérification de la variable zones

  return (
    <div className="Benevoles">
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
        Bénévoles
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" m={2}>
          Impatient.e de connaître votre affectation ?
        </Typography>
        <Button
          component={Link}
          onClick={onClickList}
          variant="contained"
          sx={{ alignItems: "center", backgroundColor: "#F88F52", m: 2 }}
        >
          Aller à la liste des bénévoles
        </Button>
      </Box>

      {/* OPORTUNITE */}
      <Box
        id="boxOportunite"
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
            Opportunités
          </Typography>
          <Typography variant="h6" gutterBottom>
            FestiFun est à la recherche de bénévoles enthousiastes et passionnés
            pour aider à animer le festival. En tant que bénévole, vous aurez la
            possibilité de participer à un événement fantastique et de
            rencontrer de nouvelles personnes, tout en vous amusant avec les
            jeux. Nous recherchons des personnes qui souhaitent accompagner des
            parties de jeux sur différentes zones du festival.
          </Typography>
        </Grid>
        <Grid xs={2} sx={{ px: 5 }}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={benevolesImage}
            className="App-logo"
            alt="benevolesImage"
          />
        </Grid>
      </Box>

      <Grid xs={12} sx={{ m: 5, mt: 0 }}>
        <Typography variant="h6" sx={{ m: 5, mt: 2 }} gutterBottom>
          En tant que bénévole pour le festival, vous aurez la chance de
          découvrir les coulisses du monde des jeux, de travailler en équipe et
          de rencontrer des personnes partageant les mêmes intérêts. Vous
          pourrez également renforcer vos compétences en communication, en
          résolution de problèmes et en leadership, tout en contribuant à la
          réussite du festival.
        </Typography>
        <Typography variant="h6" sx={{ m: 5 }} gutterBottom>
          Les postes de bénévolat disponibles comprennent l'accompagnement de
          joueurs sur différentes zones du festival, ainsi que l'aide à
          l'installation et au démontage des équipements. Nous recherchons des
          bénévoles ayant un excellent sens de l'organisation, une attitude
          positive et une passion pour les jeux.
        </Typography>
        <Typography variant="h6" sx={{ m: 5 }} gutterBottom>
          Si vous êtes intéressé par cette opportunité de bénévolat pour le
          festival FestiFun de Montpellier, veuillez consulter notre formulaire
          de candidature en ligne. Nous serons heureux de vous accueillir dans
          notre équipe et de partager avec vous notre passion pour les jeux.
        </Typography>
      </Grid>

      {/* CANDIDATURE */}
      <Box
        id="boxCandidature"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          px: 5,
          mt: 10,
        }}
      >
        <Grid xs={2} sx={{ px: 5 }}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={candidatImage}
            className="App-logo"
            alt="candidatImage"
          />
        </Grid>
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
            Candidature
          </Typography>
          <Typography variant="h6" sx={{ m: 2 }} gutterBottom>
            Le processus de candidature pour devenir bénévole à FestiFun est
            simple. Tout le monde peut postuler et nous sommes à la recherche de
            personnes passionnées par les jeux pour nous aider à animer le
            festival.
          </Typography>
          <Typography variant="h6" sx={{ m: 2 }} gutterBottom>
            Pour postuler, il vous suffit d'envoyer un e-mail à{" "}
            <b>corentin.clement@etu.umontpellier.fr</b> et{" "}
            <b>laura.benaiton@etu.umontpellier.fr</b> en indiquant votre nom,
            votre âge et vos disponibilités pour le festival. Nous vous
            encourageons également à nous parler de votre expérience et de votre
            intérêt pour les jeux. Nous recherchons des bénévoles ayant un
            excellent sens de l'organisation, une attitude positive et une
            passion pour les jeux.
          </Typography>
        </Grid>
      </Box>

      <Grid xs={12} sx={{ m: 5, mt: 0 }}>
        <Typography variant="h6" sx={{ m: 5, mt: 2 }} gutterBottom>
          Une fois que nous aurons reçu votre candidature, nous vous répondrons
          dans les plus brefs délais pour vous informer des prochaines étapes.
          Si votre candidature est retenue, nous vous enverrons un formulaire à
          remplir pour formaliser votre engagement.
        </Typography>
        <Typography variant="h6" sx={{ m: 5 }} gutterBottom>
          En tant que bénévole à FestiFun, vous aurez la possibilité de
          participer à un événement fantastique et de rencontrer de nouvelles
          personnes, tout en vous amusant avec les jeux. Vous pourrez renforcer
          vos compétences en communication, en résolution de problèmes et en
          leadership, tout en contribuant à la réussite du festival.
        </Typography>
        <Typography variant="h6" sx={{ m: 5 }} gutterBottom>
          Nous sommes impatients de recevoir votre candidature pour rejoindre
          notre équipe de bénévoles sur le festival. Si vous avez des questions
          ou des préoccupations, n'hésitez pas à nous contacter aux adresses
          e-mail indiquées.
        </Typography>
      </Grid>

      {/* AVANTAGE */}
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
            Le bénévolat au FestiFun peut être une expérience incroyablement
            enrichissante pour ceux qui cherchent à découvrir le monde des jeux
            tout en s'amusant et en aidant à animer un événement fantastique. En
            tant que bénévole, vous aurez l'opportunité de rencontrer de
            nouvelles personnes partageant les mêmes intérêts et de travailler
            en équipe pour contribuer à la réussite du festival.
          </Typography>
          <Typography variant="h6" gutterBottom mt={2}>
            L'un des avantages clés du bénévolat au FestiFun est la chance de
            découvrir les coulisses du monde des jeux, d'apprendre de nouvelles
            compétences et de renforcer celles que vous avez déjà. En tant que
            bénévole, vous pourrez améliorer votre communication, votre
            organisation et vos compétences en résolution de problèmes. Vous
            pourrez également renforcer votre confiance en vous et votre esprit
            d'initiative en travaillant en équipe pour atteindre des objectifs
            communs.
          </Typography>
        </Grid>
        <Grid xs={2} sx={{ px: 5 }}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={avantageImage}
            className="App-logo"
            alt="avantageImage"
          />
        </Grid>
      </Box>

      <Grid xs={12} sx={{ m: 5, mt: 0 }}>
        <Typography variant="h6" sx={{ m: 5 }} gutterBottom>
          En plus de ces avantages, les bénévoles au FestiFun bénéficient
          également d'un accès privilégié à l'événement, avec la possibilité de
          découvrir les dernières tendances et les jeux les plus récents, ainsi
          que d'interagir avec des professionnels de l'industrie. En tant que
          bénévole, vous aurez également la satisfaction de contribuer à la
          réussite d'un événement fantastique, tout en vous amusant avec les
          jeux.
        </Typography>
        <Typography variant="h6" sx={{ m: 5 }} gutterBottom>
          Nous sommes convaincus que le bénévolat au FestiFun peut être une
          expérience enrichissante et amusante pour tous ceux qui cherchent à
          s'impliquer dans le monde des jeux. Si vous êtes intéressé par cette
          opportunité de bénévolat, veuillez consulter notre site web pour en
          savoir plus sur les postes disponibles et comment postuler. Nous
          sommes impatients de vous accueillir dans notre équipe de bénévoles
          pour le FestiFun.
        </Typography>
      </Grid>

      {/* Liste des Bénévoles */}

      <Typography
        variant="h3"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Liste de tous les bénévoles
      </Typography>
      <Grid
        id="listBenevoles"
        container
        spacing={2}
        sx={{ height: "100%", width: "100%", display: "flex", m: 0, p: 0 }}
      >
        <Grid
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 5,
          }}
        >
          <Box sx={{ width: "50%" }}>
            {benevoles.map((benevole) => (
              <ListItem
                key={benevole._id}
                component="div"
                disablePadding
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  borderRadius: 2,
                  m: 2,
                }}
              >
                <ListItemButton>
                  <ListItemText
                    primary={`${benevole.nomBenevole} ${benevole.prenomBenevole} ( ${benevole.emailBenevole} )`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        </Grid>
      </Grid>
      <div id="listeBenevoles"><ListBenevoles sx={{m:15}} /></div>
      <Footer colorBackground="common.white" color="#FBCE9E" />
    </div>
  );
}
