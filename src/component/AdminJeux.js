import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { ApiURLJeu } from "../config";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeIcon from "@mui/icons-material/Mode";
import GamesIcon from "@mui/icons-material/Games";
import FormAdminJeux from "./FormAdminJeux";

function AdminJeux() {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [listeJeux, setListeJeux] = useState([]);
  const [jeuToModif, setJeuToModif] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [erreurForm, setErreurForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(ApiURLJeu, config);
        setListeJeux(response.data);
        console.log("ListeJeux", response.data);
      } catch (error) {
        // TODO: gérer l'erreur
        console.log(error);
        toast.error("Une erreur est survenue");
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 10 };

  const handleChange = ({ currentTarget }) => {
    setJeuToModif({
      ...jeuToModif,
      [currentTarget.name]: currentTarget.value,
    });
  };

  const handleChangeSelect = (event) => {
    setJeuToModif({
      ...jeuToModif,
      typeJeu: event.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(ApiURLJeu + id, config);
      toast.success("Le jeu a bien été supprimé");
      setListeJeux(listeJeux.filter((jeu) => jeu._id !== id));
    } catch (error) {
      console.log(error);
      toast.error(
        "Une erreur est survenue le jeu n'a pas été correctement supprimé"
      );
    }
  };

  const handleEdit = (jeu) => {
    setIsEditing(true);
    setJeuToModif(jeu);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setJeuToModif({});
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      axios.put(ApiURLJeu + jeuToModif.id, jeuToModif, config);
      toast.success("Le jeu a bien été modifié");
      setIsEditing(false);
      setListeJeux(
        listeJeux.map((jeu) => {
          if (jeu._id === jeuToModif._id) {
            return jeuToModif;
          }
          return jeu;
        })
      );
    } catch (error) {
      console.log(error);
      toast.error(
        "Une erreur est survenue le jeu n'a pas été correctement modifié"
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      {isEditing ? (
        <div className="container">
          <Grid>
            <Paper elevation={20} style={paperStyle}>
              <Grid align="center">
                <GamesIcon />
                <h2 style={headerStyle}>Modification</h2>
              </Grid>
              <form onSubmit={handleSave}>
                <TextField
                  label="Nom"
                  name="nomJeu"
                  value={jeuToModif.nomJeu}
                  placeholder="Entrer le nom du jeu"
                  fullWidth
                  required
                  onChange={handleChange}
                  erreur={erreurForm}
                />
                <Select
                  value={jeuToModif.typeJeu}
                  autoWidth
                  onChange={handleChangeSelect}
                >
                  <MenuItem value="Enfant">Enfant</MenuItem>
                  <MenuItem value="Famille">Famille</MenuItem>
                  <MenuItem value="Ambiance">Ambiance</MenuItem>
                  <MenuItem value="Initié">Initié</MenuItem>
                  <MenuItem value="Expert">Expert</MenuItem>
                </Select>
                <Button type="submit" color="primary" variant="contained">
                  Enregistrer
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleCancel}
                >
                  Annuler
                </Button>
              </form>
            </Paper>
          </Grid>
        </div>
      ) : (
        <div className="container">
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <h1>Liste des jeux</h1>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {listeJeux.map((jeu) => (
                  <ListItem key={jeu.id}>
                    <ListItemText
                      primary={jeu.nomJeu}
                      secondary={jeu.typeJeu}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEdit(jeu)}
                      >
                        <ModeIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(jeu._id)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={7}>
              <h1>Ajouter un jeu</h1>
              <FormAdminJeux />
            </Grid>
          </Grid>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default AdminJeux;
