import * as React from "react";
import axios from "axios";

import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";

import { useState } from "react";


import {
  Typography,
  Box,
  ListItem,
  Select,
  ListItemText,
  List,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemButton,
  Button,
} from "@mui/material";
import { ApiURLAffectation, ApiURLZone } from "../config";

export default function ListBenevoles() {
  // VARIABLES COMMUNES
  
  const [selectedValue, setSelectedValue] = useState("Par creneau");
  const [benevoles, setBenevoles] = React.useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setBenevoles([]);
    setCreneauSelected("");
    setZoneSelected("");
  };

  ////////////////////////////////////////////////////
  // LISTE PAR ZONE

  const [zones, setZones] = useState([]);
  const [zoneSelected, setZoneSelected] = useState("");

  // Appel API pour récupérer les zones
  React.useEffect(() => {
    axios
      .get(ApiURLZone)
      .then((response) => {
        setZones(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleZoneChange = (event) => {
    const searchZone = event.target.value;
    setZoneSelected(searchZone);

    // Appel API pour récupérer les benevoles correspondants à la zone sélectionnée
    axios
      .get(ApiURLAffectation + "ByZone/" + searchZone)
      .then((response) => {
        setBenevoles(response.data.benevoles);
      })
      .catch((error) => {
        console.log(error);
      });

    }
    ////////////////////////////////////////////////////
  // LISTE PAR CRENEAU

  const [creneauSelected, setCreneauSelected] = React.useState("");
  const [creneauHeureSelected, setCreneauHeureSelected] = React.useState("");

  const handleCreneauChange = (event) => {

    const data = {
        creneau: creneauSelected + creneauHeureSelected,
    };

    // Appel API pour récupérer les benevoles correspondants au creneau sélectionné
    axios
      .post(ApiURLAffectation + "ByCreneau", data)
      .then((response) => {
        setBenevoles(response.data.benevoles);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  ////////////////////////////////////////////////////

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 10,
      }}
    >
      <Typography variant="h3">Rechercher un benevole</Typography>
      <RadioGroup
        value={selectedValue}
        onChange={handleChange}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 5,
        }}
      >
        {["Par creneau","Par zone"].map((value) => (
          <Radio
            key={value}
            value={value}
            label={value}
            sx={{
              px: 4,
              py: 1.5,
              boxShadow: 2,
              borderRadius: 2,
              fontWeight: "lg",
              fontSize: "large",
              backgroundColor:
                selectedValue === value ? "#F88F52" : "background.paper",
              color: selectedValue === value ? "#ffffff" : "black",
            }}
          />
        ))}
      </RadioGroup>
      
      {selectedValue === "Par creneau" && (
        <Sheet
          sx={{
            p: 2,
            borderRadius: "md",
            boxShadow: "2",
            bgcolor: "background.body",
          }}
        >
          <div>
            <FormControl sx={{ m: 1, minWidth: 300 }} size="large">
              <InputLabel>Date</InputLabel>
              <Select
                value={creneauSelected}
                onChange={(event) => setCreneauSelected(event.target.value)}
                autoWidth
              >
                <MenuItem value={"11/03/2023"}>11 mars 2023</MenuItem>
                <MenuItem value={"12/03/2023"}>12 mars 2023</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 300 }} size="large">
              <InputLabel>Horaire</InputLabel>
              <Select
                value={creneauHeureSelected}
                onChange={(event) => setCreneauHeureSelected(event.target.value)}
                autoWidth
              >
                {/* Nous n'avons pas eu le temps de créer tous les creneaux en base de données, donc nous laissons uniquement 8h et 9h */}
                <MenuItem value={" 8h"}>8h</MenuItem>
                <MenuItem value={" 9h"}>9h</MenuItem>
                 {/*<MenuItem value={" 10h"}>10h</MenuItem>
                <MenuItem value={" 11h"}>11h</MenuItem>
                <MenuItem value={" 12"}>12h</MenuItem>
                <MenuItem value={" 13h"}>13h</MenuItem>
                <MenuItem value={" 14h"}>14h</MenuItem>
                <MenuItem value={" 15h"}>15h</MenuItem>
                <MenuItem value={" 16h"}>16h</MenuItem>
        <MenuItem value={" 17h"}>17h</MenuItem>*/}
              </Select>
            </FormControl>
            <Button onClick={handleCreneauChange}>Rechercher</Button>
          </div>
        </Sheet>
      )}
      {selectedValue === "Par zone" && (
        <Sheet
          sx={{
            p: 2,
            borderRadius: "md",
            boxShadow: "2",
            bgcolor: "background.body",
          }}
        >
          <div>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel>Zone</InputLabel>
              <Select
                value={zoneSelected}
                onChange={handleZoneChange}
                autoWidth
              >
                {zones.map((zone) => (
                  <MenuItem key={zone._id} value={zone._id}>
                    {zone.nomZone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Sheet>
      )}
      <RadioGroup />
      <List>
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
              <ListItemText primary={`${benevole.nomBenevole} ${benevole.prenomBenevole} ( ${benevole.emailBenevole} )`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}