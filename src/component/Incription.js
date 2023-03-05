import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { isValidNumber } from "libphonenumber-js";
import MuiPhoneNumber from "material-ui-phone-number";
import React, { useState } from "react";
import axios from "axios";
import { ApiURLBenevoles } from "../config";
import { toast, ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";

function Incription() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 10 };

  const [benevole, setBenevole] = useState({
    prenom: "",
    nom: "",
    mail: "",
    tel: "",
    description: "",
  });
  const [erreurForm, setErreurForm] = useState(false);

  const handleChange = ({ currentTarget }) => {
    console.log(currentTarget);
    setBenevole({
      ...benevole,
      [currentTarget.name]: currentTarget.value,
    });
  };

  const handleChangeTel = (value) => {
    setBenevole({
      ...benevole,
      tel: value,
    });
  };

  const handlePhoneNumberBlur = (event) => {
    if (!isValidNumber(event.target.value, "FR")) {
        toast.warning("Le numéro de téléphone n'est pas valide\nIl ne sera pas enregistré s'il reste comme cela");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!isValidNumber(benevole.tel, "FR")) {
        benevole.tel = undefined;
    }
    axios
      .post(ApiURLBenevoles, {
        prenomBenevole: benevole.prenom,
        nomBenevole: benevole.nom,
        emailBenevole: benevole.mail,
        telBenevole: benevole.tel,
        description: benevole.description,
      })
      .then((response) => {
        console.log(response);
        toast.success("Vous êtes enregistré en tant que bénévole");
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          toast.error("Il est impossible de s'inscrire actuellement");
        } else {
          switch (error.response.status) {
            case 404:
              toast.error(
                "Il est impossible de s'inscrire actuellement"
              );
              break;
            case 500:
              toast.warning("Il y a une erreur dans le formulaire");
              toast.info(error.response.data.message);
              setErreurForm(true);
              break;
            default:
              toast.error("Une erreur est survenue");
              break;
          }
        }
      });
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar></Avatar>
            <h2 style={headerStyle}>Inscription</h2>

            <Typography style={headerStyle} variant="caption">
              Remplissez les champs pour vous inscrire
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              name="nom"
              placeholder="Entrer votre nom"
              fullWidth
              required
              onChange={handleChange}
              erreur={erreurForm}
            />
            <TextField
              label="Prénom"
              name="prenom"
              placeholder="Entrer votre prénom"
              fullWidth
              required
              onChange={handleChange}
              erreur={erreurForm}
            />
            <TextField
              label="Email"
              name="mail"
              type="email"
              placeholder="Entrer votre email"
              fullWidth
              required
              onChange={handleChange}
              erreur={erreurForm}
            />
            <MuiPhoneNumber
              label="Téléphone"
              defaultCountry={"fr"}
              onlyCountries={["fr"]}
              value={benevole.tel}
              color="secondary"
              onChange={handleChangeTel}
              onBlur={handlePhoneNumberBlur}
              fullWidth
            />
            <TextareaAutosize
              aria-label="Description optionnelle"
              label="Description"
              name="description"
              placeholder="Entrer une description :
              Vous présentez, vos compétences, vos disponibilités, vos motivations, etc."
              fullWidth
              onChange={handleChange}
              erreur={erreurForm}
            />
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Valider
            </Button>
          </form>
        </Paper>
      </Grid>
      <Footer />
    </div>
  );
}

export default Incription;
