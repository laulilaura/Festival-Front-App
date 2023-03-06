import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button, Grid } from "@mui/material";
import { ApiURLBenevole, ApiURLAffectation, ApiURLZone } from "../config";
import Header from "./Header";
import Footer from "./Footer";

function Affectations() {
  const [DefaultListeAffecations, setDefaultListeAffecations] = useState([]);
  const [listeAffectations, setListeAffectations] = useState([]);
  const [listeBenevoles, setListeBenevoles] = useState([]);

  const token = localStorage.getItem("token"); // récupérer le token depuis le stockage local
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // ajouter le token à l'en-tête d'autorisation
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [responseBenevoles, responseAffectations, responseZones] =
          await Promise.all([
            axios.get(ApiURLBenevole),
            axios.get(ApiURLAffectation),
            axios.get(ApiURLZone),
          ]);

        responseAffectations.data.forEach((affectation) => {
          affectation.zone = responseZones.data.find(
            (zone) => zone._id === affectation.zone
          );
          affectation.heureDebut = {
            _id:
              parseInt(
                affectation.heureDebut.charAt(affectation.heureDebut.length - 2)
              ) - 8,
            heureDebut: affectation.heureDebut,
          };
        });

        const copy = JSON.parse(JSON.stringify(responseAffectations.data));

        setListeBenevoles(responseBenevoles.data);
        setListeAffectations(responseAffectations.data);
        setDefaultListeAffecations(copy);

        console.log("ListeBenevoles", responseBenevoles.data);
        console.log("ListeAffectations", responseAffectations.data);
        console.log("DefaultListeAffecations", copy);
      } catch (error) {
        // TODO: gérer l'erreur
        console.log(error);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.getAttribute("id"));
  };

  const over = (event) => {
    // Utile pour le css
    event.preventDefault();
  };

  const drop = (event, affectationDrop) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/html");
    const benevole = listeBenevoles.find((benevole) => benevole._id === id);

    const newListeAffectations = [...listeAffectations];

    let dejaAffecte = false;
    let i = 0;
    while (i < newListeAffectations.length && !dejaAffecte) {
      if (
        newListeAffectations[i].heureDebut._id ===
          affectationDrop.heureDebut._id &&
        newListeAffectations[i].heureDebut.heureDebut.charAt(1) ===
          affectationDrop.heureDebut.heureDebut.charAt(1) &&
        newListeAffectations[i].benevoles.includes(benevole)
      ) {
        dejaAffecte = true;
      }
      i++;
    }

    if (dejaAffecte) {
      newListeAffectations[i - 1].benevoles.splice(
        newListeAffectations[i - 1].benevoles.indexOf(benevole),
        1
      );
    }

    const newAffectation = newListeAffectations.find(
      (affectation) => affectationDrop._id === affectation._id
    );
    newAffectation.benevoles.push(benevole);

    setListeAffectations(newListeAffectations);

    event.stopPropagation();
    return false;
  };

  const validate = async () => {
    const benevolesToAdd = [];
    const benevolesToDelete = [];

    listeAffectations.forEach((affectation) => {
      DefaultListeAffecations.forEach((defaultAffectation) => {
        if (affectation._id === defaultAffectation._id) {
          affectation.benevoles.forEach((benevole) => {
            if (!defaultAffectation.benevoles.includes(benevole)) {
              benevolesToAdd.push({
                benevole: benevole._id,
                affectation: affectation._id,
              });
            }
          });
          defaultAffectation.benevoles.forEach((benevole) => {
            if (!affectation.benevoles.includes(benevole)) {
              benevolesToDelete.push({
                benevole: benevole._id,
                affectation: affectation._id,
              });
            }
          });
        }
      });
    });

    console.log("benevolesToAdd", benevolesToAdd);
    console.log("benevolesToDelete", benevolesToDelete);

    const response1 = await axios.post(
      ApiURLAffectation + "addBenevoles",
      benevolesToAdd,
      config
    );
    const response2 = await axios.post(
      ApiURLAffectation + "removeBenevoles",
      benevolesToDelete,
      config
    );
    if (response1.data && response2.data) {
      toast.success("Les affectations ont été validées avec succès");
    } else {
      toast.error(
        "Une erreur est survenue lors de la validation des affectations"
      );
    }
  };

  const reset = () => {
    setListeAffectations(DefaultListeAffecations);
    toast.success("Les affectations ont été réinitialisées par défault");
  };

  const cancel = () => {
    //TODO: amener à la page d'accueil
  };

  const onDelete = (affectationClick, benevole) => {
    const newListeAffectations = [...listeAffectations];
    const newAffectation = newListeAffectations.find(
      (affectation) => affectationClick._id === affectation._id
    );

    newAffectation.benevoles.splice(
      newAffectation.benevoles.indexOf(benevole),
      1
    );
    setListeAffectations(newListeAffectations);
  };

  // Variable pour gérer l'affichage du nom des zones
  let zoneCourante = null;
  return (
    <div>
      <Header />
      <ToastContainer />

      <Button variant="contained" color="primary" onClick={validate}>
        Valider
      </Button>
      <Button variant="contained" color="secondary" onClick={reset}>
        Reset
      </Button>
      <Button variant="contained" color="secondary" onClick={cancel}>
        Annulé
      </Button>

      <h1>Affectations</h1>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <h2>Liste des bénévoles</h2>
          <div className="listeBenevoles" onDragStart={start} onDragOver={over}>
            {listeBenevoles.map((benevole) => (
              <div id={benevole._id} key={benevole._id + "1"} draggable="true">
                <h2>
                  {benevole.prenomBenevole} {benevole.nomBenevole}
                </h2>
                {/* <h3>{benevole.emailBenevole}</h3> */}
              </div>
            ))}
          </div>
        </Grid>

        <Grid item xs={9}>
          <h2>Liste des affectations</h2>
          <div className="listeAffectations">
            {listeAffectations.map((affectation) => {
              const nomZone = affectation.zone.nomZone;

              let nomZoneElement = null;
              if (nomZone !== zoneCourante) {
                nomZoneElement = nomZone;
                zoneCourante = nomZone;
              }
              return (
                <div
                  key={affectation._id}
                  onDragStart={start}
                  onDragOver={over}
                  onDrop={(event) => drop(event, affectation)}
                >
                  <h3>{nomZoneElement}</h3>
                  <h4>{affectation.heureDebut.heureDebut}</h4>
                  <h4>Drop here</h4>

                  <div className="affectation">
                    {affectation.benevoles.map((benevole) => (
                      <div
                        id={benevole._id}
                        key={benevole._id}
                        draggable="true"
                      >
                        <h5>
                          {benevole.prenomBenevole} {benevole.nomBenevole}
                        </h5>
                        <h6>{benevole.emailBenevole}</h6>
                        <Button
                          onClick={(e) => onDelete(affectation, benevole)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default Affectations;
