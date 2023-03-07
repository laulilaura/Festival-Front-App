import * as React from "react";
import axios from "axios";

import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";

import { useState } from "react";

import {
  Typography,
  Box,
  TextField,
  ListItem,
  Select,
  ListItemText,
  List,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemButton,
} from "@mui/material";
import { ApiURLJeu, ApiURLZone } from "../config";

export default function ListJeux() {
  // VARIABLES COMMUNES

  const [selectedValue, setSelectedValue] = useState("Par nom");
  const [jeux, setJeux] = React.useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setJeux([]);
    setSearchValue("");
    setTypeSelected("");
    setZoneSelected("");
  };

  ////////////////////////////////////////////////////
  // LISTE PAR NOM

  const [searchValue, setSearchValue] = useState("");

  const handleSearchByName = (event) => {
    const searchName = event.target.value;
    setSearchValue(searchName);

    if (searchName !== "") {
      axios
        .get(ApiURLJeu + "byName/" + searchName)
        .then((response) => {
          setJeux(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setJeux([]);
    }
  };

  ////////////////////////////////////////////////////
  // LISTE PAR TYPE

  const [typeSelected, setTypeSelected] = React.useState("");

  const handleTypeChange = (event) => {
    const searchType = event.target.value;
    setTypeSelected(searchType);

    // Appel API pour récupérer les jeux correspondants au type sélectionné
    axios
      .get(ApiURLJeu + "byType/" + searchType)
      .then((response) => {
        setJeux(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const   handleZoneChange = (event) => {
    const searchZone = event.target.value;
    setZoneSelected(searchZone);

    // Appel API pour récupérer les jeux correspondants à la zone sélectionnée
    axios
      .get(ApiURLZone + searchZone)
      .then((response) => {
        setJeux(response.data.jeux);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <Typography variant="h3">Rechercher un jeu</Typography>
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
        {["Par nom", "Par type", "Par zone"].map((value) => (
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
      {selectedValue === "Par nom" && (
        <Sheet
          sx={{
            p: 2,
            borderRadius: "md",
            boxShadow: "2",
            bgcolor: "background.body",
          }}
        >
          <div>
            <TextField
              label="Recherche par nom"
              variant="outlined"
              onChange={handleSearchByName}
              value={searchValue}
            />
          </div>
        </Sheet>
      )}
      {selectedValue === "Par type" && (
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
              <InputLabel>Type</InputLabel>
              <Select
                value={typeSelected}
                onChange={handleTypeChange}
                autoWidth
              >
                <MenuItem value={"Enfant"}>Enfant</MenuItem>
                <MenuItem value={"Famille"}>Famille</MenuItem>
                <MenuItem value={"Ambiance"}>Ambiance</MenuItem>
                <MenuItem value={"Initié"}>Initié</MenuItem>
                <MenuItem value={"Expert"}>Expert</MenuItem>
              </Select>
            </FormControl>
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
        {jeux.map((jeu) => (
          <ListItem
            key={jeu._id}
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
              <ListItemText primary={`${jeu.nomJeu} ( ${jeu.typeJeu} )`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
