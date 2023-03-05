import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiURLBenevoles } from "../config";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Collapse,
  Avatar,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast, ToastContainer } from "react-toastify";

function ListeInscriptionBenevole() {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [listeNewBenevoles, setListeNewBenevoles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(ApiURLBenevoles + "/nouveaux", config);
        response.data.forEach((benevole) => (benevole.expanded = false));
        setListeNewBenevoles(response.data);
        console.log("ListeNewBenevoles", response.data);
      } catch (error) {
        console.log(error);
        // TODO: gérer l'erreur, par exemple afficher un message à l'utilisateur
      }
    }
    fetchData();
  }, []);

  const handleExpandMore = async (benevoleId) => {
    const copy = [...listeNewBenevoles];
    const index = copy.findIndex((benevole) => benevole._id === benevoleId);

    if (copy[index].description === undefined) {
      toast.info("Le bénévole n'a pas rempli sa description");
    } else {
      copy[index].expanded = !copy[index].expanded;
      setListeNewBenevoles(copy);
    }
  };

  const accept = async (benevoleId) => {
    axios
      .put(ApiURLBenevoles + "/validate/" + benevoleId, null, config)
      .then((response) => {
        setListeNewBenevoles(
          listeNewBenevoles.filter((benevole) => benevole._id !== benevoleId)
        );
        toast.success(
          "Le bénévole est maintenant disponible pour les affectations"
        );
      })
      .catch((error) => {
        // TODO: gérer l'erreur, par exemple afficher un message à l'utilisateur
        console.log(error);
        toast.error(
          "Il y a eu un problème! Le bénévole n'est pas disponible pour les affectations"
        );
      });
  };

  const refuse = async (benevoleId) => {
    axios
      .delete(ApiURLBenevoles + "/" + benevoleId, config)
      .then((response) => {
        setListeNewBenevoles(
          listeNewBenevoles.filter((benevole) => benevole._id !== benevoleId)
        );
        toast.success("Le bénévole a été refusé");
      })
      .catch((error) => {
        // TODO: gérer l'erreur, par exemple afficher un message à l'utilisateur
        console.log(error);
        toast.error("Il y a eu un problème! Le bénévole n'a pas été refusé");
      });
  };

  return (
    <div>
      <ToastContainer />
      <h1>Liste des nouvelles inscriptions de bénévoles</h1>
      <div className="container" >
        {listeNewBenevoles.map((benevole) => (
          <Card className="item" key={benevole._id} style={{ width: "25%", border: "black solid 4px", borderRadius: "25px", marginBottom: "10px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 1)"}}>
            <CardContent>
              <Avatar />
              <Typography variant="h5" component="div">
                {benevole.nomBenevole} {benevole.prenomBenevole}
              </Typography>
              <Typography variant="body2">{benevole.emailBenevole}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={(e) => accept(benevole._id)}>
                <CheckOutlinedIcon />
              </Button>
              <Button size="small" onClick={(e) => refuse(benevole._id)}>
                <DeleteForeverOutlinedIcon />
              </Button>
              <Button
                size="small"
                onClick={(e) => handleExpandMore(benevole._id)}
              >
                <ExpandMoreIcon />
              </Button>
            </CardActions>
            <Collapse in={benevole.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="h5">Description :</Typography>
                <Typography variant="body2">{benevole.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ListeInscriptionBenevole;
