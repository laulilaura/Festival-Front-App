import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import { ApiURLZones, ApiURLBenevoles, ApiURLAffectation } from "../../config";
import Header from "../Header";
import Footer from "../Footer";

function Affectations() {
  const [defaultAffectations, setDefaultAffectations] = useState([]);
  const [zones, setZones] = useState([]);
  const [benevoles, setBenevoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [benevolesResponse, zonesResponse, affectationsResponse] =
          await Promise.all([
            axios.get(ApiURLBenevoles),
            axios.get(ApiURLZones),
            axios.get(ApiURLAffectation),
          ]);

        const benevolesData = benevolesResponse.data;
        const zonesData = zonesResponse.data;
        const affectationsData = affectationsResponse.data;

        // console.log("benevoles", benevolesData);
        // console.log("zones", zonesData);
        // console.log("affectations", affectationsData);

        const datas = [];
        const jours = [11];
        zonesData.forEach((zone) => {
          const heuresDebut = [];
          let id = 1;
          for (let jour of jours) {
            for (let heure = 8; heure < 10; heure++) {
              let date = new Date(Date.UTC(2023, 2, jour, heure));
              date = `${date.getUTCDate()}/0${date.getUTCMonth()+1}/${date.getUTCFullYear()} ${date.getUTCHours()}h`
              const heureDebut = {
                _id: id,
                date: date,
                benevoles: [],
                // idAffectation: affectationsData.find((affectation) => affectation.zone === zone._id && affectation.heureDebut === date)?._id
              };
              heuresDebut.push(heureDebut);
              id++;
            }
          }
          datas.push({
            _id: zone._id,
            nomZone: zone.nomZone,
            heuresDebut: heuresDebut,
          });
        });


        setBenevoles(benevolesData);
        setZones(datas);
        const copy = JSON.parse(JSON.stringify(datas));
        setDefaultAffectations(copy);
        setLoading(false);
      } catch (error) {
        // TODO : gérer l'erreur
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const start = (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.getAttribute("id"));
  };

  const over = (event) => {
    event.preventDefault();
  };

  const drop = (event, zoneId, heuresDebutId) => {
    const ob = event.dataTransfer.getData("text/html");
    const benevole = benevoles.find((benevole) => benevole._id === ob);

    const newZones = [...zones];

    let dejaAffecte = false;
    let i = 0;
    let j = 0;
    while (i < zones.length && !dejaAffecte) {
      j = 0;
      while (
        j < zones[i].heuresDebut[heuresDebutId - 1].benevoles.length &&
        !dejaAffecte
      ) {
        dejaAffecte =
          zones[i].heuresDebut[heuresDebutId - 1].benevoles[j]._id === benevole._id;
        j++;
      }
      i++;
    }

    if (dejaAffecte) {
      // TODO : toast
      newZones[i - 1].heuresDebut[heuresDebutId - 1].benevoles.splice(j - 1, 1);
    }

    const newZone = newZones.find((zone) => zone._id === zoneId);
    newZone.heuresDebut[heuresDebutId - 1].benevoles.push(benevole);

    setZones(newZones);

    // event.currentTarget.appendChild(document.getElementById(ob));
    event.stopPropagation();

    console.log("ICI : ", zones);
    return false;
  };

  const leave = (event, zoneId) => {
    return false;
  };

  const onDelete = (event, zoneId, heuresDebutId, benevoleId) => {
    const newZones = [...zones];

    const newZone = newZones.find((zone) => zone._id === zoneId);
    newZone.heuresDebut[heuresDebutId - 1].benevoles.splice(benevoleId, 1);

    setZones(newZones);
  };

  const validate = () => {
    const benevolesToAdd = [];
    const benevolesToDelete = [];
    zones.forEach((zone, indexZone) => {
      zone.heuresDebut.forEach((heureDebut, indexHeureDebut) => {
        heureDebut.benevoles.forEach((benevoleCreneau) => {
          const benevoleInDefault = defaultAffectations[indexZone].heuresDebut[indexHeureDebut].benevoles.find(
            (benevoleDefault) => benevoleCreneau._id === benevoleDefault._id
          );
          if (!benevoleInDefault) {
            benevolesToAdd.push({
              benevole: benevoleCreneau,
              zone: zone._id,
              creneau: heureDebut._id
            });
          }
        });
      });
    });

    defaultAffectations.forEach((zone, indexZone) => {
      zone.heuresDebut.forEach((heureDebut, indexHeureDebut) => {
        heureDebut.benevoles.forEach((benevoleDefault) => {
          const benevoleInNew = zones[indexZone].heuresDebut[indexHeureDebut].benevoles.find(
            (benevoleCreneau) => benevoleDefault._id === benevoleCreneau._id
          );
          if (!benevoleInNew) {
            benevolesToDelete.push({
              benevole: benevoleDefault,
              zone: zones[indexZone]._id,
              creneau: zones[indexZone].heuresDebut[indexHeureDebut]._id});
          }
        });
      });
    });

    console.log(benevolesToAdd);
    console.log(benevolesToDelete);
  };

  const reset = () => {
    const copy = JSON.parse(JSON.stringify(defaultAffectations));
    setZones(copy);
  };

  const cancel = () => {
    // TODO: ramener sur page initiale rien n'a été enregistré ds la bdd
  };

  return (
    <div>
      <Header />

      
      <h1>Affectations</h1>
      {/* TODO: gérer le css...jpensais que des cards c'était une bonne idéé mais bon la comme ça c'est moche et galère */}
      {/* NOTE : la méthode over permet justement de mettre du css lorsqu'on passe l'item sur un drop here et la méthode leave permet de remettre à jour le css si justement on passe l'item mais finalement qu'on annule */}
      {/* Voir : https://www.youtube.com/watch?v=N77_0lq9JZI */}

      {/* {benevoles.map((benevole) => (
        <Card
          id={benevole._id}
          key={benevole._id}
          draggable="true"
          className={styles.card}
          onDragStart={start}
          onDragOver={over}
        >
          <CardContent className={styles.cardContent}>
            <h2>
              {benevole.prenomBenevole} {benevole.nomBenevole}
            </h2>
            <h3>{benevole.emailBenevole}</h3>
          </CardContent>
        </Card>
      ))}

      <div className="zoneListe">
        {zones.map((zone) => (
          <div key={zone._id}>
            <h2>{zone.nomZone}</h2>
            {zone.heuresDebut.map((heureDebut) => (
              <div key={heureDebut._id}>
                <h3>{heureDebut.date.toLocaleString()}</h3>
                <div
                  className="heureDebut"
                  onDragStart={start}
                  onDragOver={over}
                  onDrop={(e) => drop(e, zone._id, heureDebut._id)}
                >
                  {heureDebut.benevoles.map((benevole) => (
                    <Card
                      id={benevole._id}
                      key={benevole._id}
                      draggable="true"
                      className={styles.card}
                    >
                      <CardContent className={styles.cardContent}>
                        <h2>
                          {benevole.prenomBenevole} {benevole.nomBenevole}
                        </h2>
                        <h3>{benevole.emailBenevole}</h3>
                      </CardContent>
                      <CardActions>
                        <Button
                          className={styles.deleteButton}
                          color="secondary"
                          variant="contained"
                          onClick={onDelete}
                        >
                          Supprimer
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div> */}

      <div onDragStart={start} onDragOver={over}>
        {benevoles.map((benevole) => (
          <div id={benevole._id} key={benevole._id} draggable="true">
            <h2>
              {benevole.prenomBenevole} {benevole.nomBenevole}
            </h2>
            <h3>{benevole.emailBenevole}</h3>
          </div>
        ))}
      </div>

      <div>
        {zones.map((zone) => (
          <div key={zone._id}>
            <h2>{zone.nomZone}</h2>
            {zone.heuresDebut.map((heureDebut) => (
              <div key={heureDebut._id}>
                <h3>{heureDebut.date.toLocaleString()}</h3>
                <div>
                  <ul
                    onDragStart={start}
                    onDragOver={over}
                    onDrop={(e) => drop(e, zone._id, heureDebut._id)}
                  >
                    <h4>Drop here</h4>
                    {heureDebut.benevoles.map((benevole) => (
                      <div>
                        <li
                          id={benevole._id}
                          key={benevole._id}
                          draggable="true"
                        >
                          {benevole.prenomBenevole} {benevole.nomBenevole}
                          {benevole.emailBenevole}
                        </li>
                        <Button
                          onClick={(e) =>
                            onDelete(e, zone._id, heureDebut._id, benevole._id)
                          }
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Affectations;
