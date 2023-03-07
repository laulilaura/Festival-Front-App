import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ApiURLJeu } from "../config";

function FormAdminJeux() {
  const [jeu, setJeu] = useState({
    nom: "",
    typeJeu: "Enfant",
  });

  const [erreurForm, setErreurForm] = useState(false);

  const handleChange = ({ currentTarget }) => {
    setJeu({
      ...jeu,
      [currentTarget.name]: currentTarget.value,
    });
  };

  const handleChangeSelect = (event) => {
    setJeu({
      ...jeu,
      typeJeu: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(ApiURLJeu, {
        nomJeu: jeu.nom,
        typeJeu: jeu.type,
      })
      .then((response) => {
        console.log(response);
        toast.success("Le jeu a bien été créé");
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          toast.error("Il est impossible de créer un jeu actuellement");
        } else {
          switch (error.response.status) {
            case 404:
              toast.error("Il est impossible de créer un jeu actuellement");
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
      <ToastContainer />
      <FormControl>
        <InputLabel htmlFor="my-input">Nom du jeu</InputLabel>
        <Input
          id="jeu-input"
          name="jeu"
          onChange={handleChange}
          aria-describedby="my-helper-text"
          color="secondary"
          error={erreurForm}
        />
        </FormControl>
        <FormControl>
        <InputLabel htmlFor="my-input">Type du jeu</InputLabel>
        <Select value={jeu.typeJeu} autoWidth onChange={handleChangeSelect}>
          <MenuItem value="Enfant">Enfant</MenuItem>
          <MenuItem value="Famille">Famille</MenuItem>
          <MenuItem value="Ambiance">Ambiance</MenuItem>
          <MenuItem value="Initié">Initié</MenuItem>
          <MenuItem value="Expert">Expert</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Créer
      </Button>
    </div>
  );
}

export default FormAdminJeux;
