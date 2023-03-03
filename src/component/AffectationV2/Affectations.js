import React, { useState } from "react";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import datas from "../../data";
import { benevoles } from "../../data";
import Header from "../Header";
import Footer from "../Footer";

function Affectations() {
  const [zones, setZones] = useState(datas);

  const start = (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.getAttribute("id"));
  };

  const over = (event) => {
    event.preventDefault();
  };

  const drop = (event, zoneId, creneauId) => {
    const ob = event.dataTransfer.getData("text/html");
    const benevole = benevoles.find((benevole) => benevole._id === ob);

    const newZones = [...zones];

    let dejaAffecte = false;
    let i = 0;
    let j = 0;
    while (i < zones.length && !dejaAffecte) {
      j = 0;
      while (
        j < zones[i].creneaux[creneauId - 1].benevoles.length &&
        !dejaAffecte
      ) {
        dejaAffecte =
          zones[i].creneaux[creneauId - 1].benevoles[j]._id === benevole._id;
        j++;
      }
      i++;
    }

    if (dejaAffecte) {
      // TODO : toast
      newZones[i - 1].creneaux[creneauId - 1].benevoles.splice(j - 1, 1);
    }

    const newZone = newZones.find((zone) => zone._id === zoneId);
    newZone.creneaux[creneauId - 1].benevoles.push(benevole);

    setZones(newZones);

    // event.currentTarget.appendChild(document.getElementById(ob));
    event.stopPropagation();

    console.log("ICI : ", zones);
    return false;
  };

  const leave = (event, zoneId) => {
    return false;
  };

  const onDelete = (event) => {
    console.log("ICI");
  };

  return (
    <div>
      <Header />

      <h1>Affectations</h1>

      <div className="benevoleListe" onDragStart={start} onDragOver={over}>
        {benevoles.map((benevole) => (
          <Card id={benevole._id} key={benevole._id} draggable="true">
            <CardContent>
              <h2>
                {benevole.prenomBenevole} {benevole.nomBenevole}
              </h2>
              <h3>{benevole.emailBenevole}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="zoneListe">
        {zones.map((zone) => (
          <div key={zone._id}>
            <h2>{zone.nomZone}</h2>
            {zone.creneaux.map((creneau) => (
              <div key={creneau._id}>
                <h3>{creneau.date.toLocaleString()}</h3>
                <div
                  className="creneau"
                  onDragStart={start}
                  onDragOver={over}
                  onDrop={(e) => drop(e, zone._id, creneau._id)}
                >
                  {creneau.benevoles.map((benevole) => (
                    <Card id={benevole._id} key={benevole._id} draggable="true">
                      <CardContent>
                        <h2>
                          {benevole.prenomBenevole} {benevole.nomBenevole}
                        </h2>
                        <h3>{benevole.emailBenevole}</h3>
                      </CardContent>
                      <CardActions>
                        <Button
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
      </div>

      {/* <div
        onDragStart={start}
        onDragOver={over}
      >
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
            {zone.creneaux.map((creneau) => (
              <div key={creneau._id}>
                <h3>{creneau.date.toLocaleString()}</h3>
                <div>
                  <ul
                    onDragStart={start}
                    onDragOver={over}
                    onDrop={(e) => drop(e, zone._id, creneau._id)}
                  >
                    <h4>Drop here</h4>
                    {creneau.benevoles.map((benevole) => (
                      <li id={benevole._id} key={benevole._id} draggable="true">
                        {benevole.prenomBenevole} {benevole.nomBenevole}
                        {benevole.emailBenevole}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div> */}

      <Footer />
    </div>
  );
}

export default Affectations;
