import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  ListItemAvatar,
  Button,
  Grid,
  Paper,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { isValidNumber } from "libphonenumber-js";
import MuiPhoneNumber from "material-ui-phone-number";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeIcon from "@mui/icons-material/Mode";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiURLBenevole } from "../config";
import Footer from "./Footer";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import FormAdminBenevoles from "./FormAdminBenevoles";

function AdminBenevoles() {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [listeBenevoles, setListeBenevoles] = useState([]);
  const [benevoleToModif, setBenevoleToModif] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [erreurForm, setErreurForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(ApiURLBenevole, config);
        response.data.forEach((benevole) => {
          benevole.prenomNom =
            benevole.prenomBenevole + " " + benevole.nomBenevole;
        });
        setListeBenevoles(response.data);
        console.log("ListeBenevoles", response.data);
      } catch (error) {
        // TODO: gérer l'erreur
        console.log(error);
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 10 };

  const handleChange = ({ currentTarget }) => {
    setBenevoleToModif({
      ...benevoleToModif,
      [currentTarget.name]: currentTarget.value,
    });
  };

  const handleChangeTel = (value) => {
    setBenevoleToModif({
      ...benevoleToModif,
      tel: value,
    });
  };

  const handlePhoneNumberBlur = (event) => {
    if (!isValidNumber(event.target.value, "FR")) {
      toast.warning(
        "Le numéro de téléphone n'est pas valide\nIl ne sera pas modifié s'il reste comme cela"
      );
      setErreurForm(true);
    } else {
      setErreurForm(false);
    }
  };

  const handleDelete = (benevoleId) => async () => {
    try {
      await axios.delete(ApiURLBenevole + benevoleId, config);
      const copy = [...listeBenevoles];
      const index = copy.findIndex((benevole) => benevole._id === benevoleId);
      copy.splice(index, 1);
      setListeBenevoles(copy);
      toast.success("Le bénévole a été supprimé");
    } catch (error) {
      //TODO: gérer l'erreur
      console.log(error);
      toast.error("Une erreur est survenue");
    }
  };

  const handleEdit = (benevole) => async () => {
    setBenevoleToModif(benevole);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBenevoleToModif({});
  };

  const handleSave = () => {
    const infoBenevole = {
      nomBenevole: benevoleToModif.nomBenevole,
      prenomBenevole: benevoleToModif.prenomBenevole,
      telBenevole: benevoleToModif.tel,
      emailBenevole: benevoleToModif.email,
    };
    axios
      .put(ApiURLBenevole + benevoleToModif._id, infoBenevole, config)
      .then((response) => {
        toast.success("Le bénévole a été modifié");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          toast.error("Il est impossible de modifier un bénéole actuellement");
        } else {
          switch (error.response.status) {
            case 404:
              toast.error(
                "Il est impossible de modifier un bénéole actuellement"
              );
              break;
            case 500:
              setErreurForm(true);
              toast.warning("Il y a une erreur dans le formulaire");
              break;
            default:
              toast.error("Une erreur est survenue");
              break;
          }
        }
      });
    setIsEditing(false);
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      {isEditing ? (
        <div>
          <Grid>
            <Paper elevation={20} style={paperStyle}>
              <Grid align="center">
                <PersonIcon />
                <h2 style={headerStyle}>Modification</h2>
              </Grid>
              <form onSubmit={handleSave}>
                <TextField
                  label="Nom"
                  name="nomBenevole"
                  value={benevoleToModif.nomBenevole}
                  placeholder="Entrer votre nom"
                  fullWidth
                  required
                  onChange={handleChange}
                  erreur={erreurForm}
                />
                <TextField
                  label="Prénom"
                  name="prenomBenevole"
                  value={benevoleToModif.prenomBenevole}
                  placeholder="Entrer votre prénom"
                  fullWidth
                  required
                  onChange={handleChange}
                  erreur={erreurForm}
                />
                <TextField
                  label="Email"
                  type="email"
                  name="emailBenevole"
                  value={benevoleToModif.emailBenevole}
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
                  value={benevoleToModif.tel}
                  color="secondary"
                  onChange={handleChangeTel}
                  onBlur={handlePhoneNumberBlur}
                  fullWidth
                />
                <TextareaAutosize
                  aria-label="Description optionnelle"
                  label="Description"
                  name="description"
                  value={benevoleToModif.description}
                  placeholder="Entrer une description :
              Vous présentez, vos compétences, vos disponibilités, vos motivations, etc."
                  fullWidth
                  onChange={handleChange}
                  erreur={erreurForm}
                />
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
              <h1>Liste des bénévoles</h1>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {listeBenevoles.map((benevole) => (
                  <ListItem key={benevole._id}>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={benevole.prenomNom}
                      secondary={benevole.emailBenevole}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={handleEdit(benevole)}
                      >
                        <ModeIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleDelete(benevole._id)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={7}>
              <ToastContainer />
              <h1>Ajouter un bénévole</h1>
              <FormAdminBenevoles />
            </Grid>
          </Grid>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default AdminBenevoles;
