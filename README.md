***PROJET WEB - CORENTIN CLEMENT - LAURA BENAITON***
<sub>Rendu 07/03/2023</sub>
  
Projet Frontend réalisé en Reactjs, utilisant différentes librairie et dépendances

Le projet se lance avec la commande :

>`npm start`

Vous arriverez sur un page 'Home', vous pouvez y naviguer librement.
Il est également possible de se connecter à un compte Admin, qui possède plus de droits qu'un simple utilisateurs exterieur :

Connexion admin :
>email : corentinAdmin@gmail.com
>mdp : test

Notre projet se base sur deux plans différents :
+ **Bénévole :** Ils ont accès à toutes les informations utiles qui pourrait leur servir, comme le listage des zones, des jeux ou encore des bénévoles. Ils ont également accès à des informations pour le festival.
+ **Admin :** Ils ont accès à une seconde partie du site web, après une connexion dans la barre de navigation public 'Connexion Admin', après s'être connecté, il faut se rendre sur l'URL /affectations où l'admin pourra naviguer sur plusieurs pages afin d'affecter des bénévoles à des zones, de valider l'inscription de benevoles etc


Voici ci dessous les différentes dépendances installés :


### install Mui (React component library)
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material
npm install @mui/styles
npm install @mui/material-next
npm install @mui/joy

### router (Navigation de page)
npm install react-router-dom

### Axios requetes https
npm install axios

### listes
npm install react-window

### toasts
npm i material-react-toastify

### phone
npm i material-ui-phone-number
npm install libphonenumber-js

### icons
npm install @mui/icons-material

<sub>
### !! Si problème de dépendance
--legacy-peer-deps
</sub>
