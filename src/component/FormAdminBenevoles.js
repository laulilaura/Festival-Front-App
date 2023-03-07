import React from "react";
import axios from "axios";
import { ApiURLBenevole } from "../config";
import MuiPhoneNumber from "material-ui-phone-number";
import { toast, ToastContainer } from "react-toastify";
import { FormControl, InputLabel, Input, Button } from "@mui/material/";

function FormAdminBenevoles() {
  const [benevoles, setBenevoles] = React.useState({
    prenom: "",
    nom: "",
    email: "",
    tel: "+33 1 23 45 67 89",
  });

  const handleChange = ({ currentTarget }) => {
    setBenevoles({
      ...benevoles,
      [currentTarget.name]: currentTarget.value,
    });
  };

  const [erreurForm, setErreurForm] = React.useState(false);

  const handleChangeTel = (value) => {
    setBenevoles({
      ...benevoles,
      telBenevole: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(ApiURLBenevole, {
        prenomBenevole: benevoles.prenom,
        nomBenevole: benevoles.nom,
        emailBenevole: benevoles.email,
        telBenevole: benevoles.tel,
        valider: true,
      })
      .then((response) => {
        console.log(response);
        toast.success("Le bénévole a bien été créé");
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          toast.error("Il est impossible de créer un bénévole actuellement");
        } else {
          switch (error.response.status) {
            case 404:
              toast.error(
                "Il est impossible de créer un bénévole actuellement"
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
    <div className="Form" id="FormCreateBenevole">
      <ToastContainer />
      <FormControl>
        <InputLabel htmlFor="my-input">Mail du bénévole</InputLabel>
        <Input
          id="email-input"
          name="email"
          onChange={handleChange}
          aria-describedby="my-helper-text"
          color="secondary"
          error={erreurForm}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Prénom du bénévole</InputLabel>
        <Input
          id="prenom-input"
          name="prenom"
          onChange={handleChange}
          aria-describedby="my-helper-text"
          color="secondary"
          error={erreurForm}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Nom du bénévole</InputLabel>
        <Input
          id="nom-input"
          name="nom"
          onChange={handleChange}
          aria-describedby="my-helper-text"
          color="secondary"
          error={erreurForm}
        />
      </FormControl>
      <MuiPhoneNumber
        defaultCountry={"fr"}
        onlyCountries={["fr"]}
        value={benevoles.tel}
        onChange={handleChangeTel}
        color="secondary"
        error={erreurForm}
      />
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Créer
      </Button>
    </div>
  );
}

export default FormAdminBenevoles;
