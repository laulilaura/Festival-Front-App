// const creneaux = [];
// const jours = [11, 12];
// let id = 1;
// for (let jour of jours) {
//   for (let heure = 8; heure < 20; heure++) {
//     const date = new Date(2023, 2, jour, heure);
//     const creneau = {
//       id: id,
//       date: date,
//     };
//     creneaux.push(creneau);
//     id++;
//   }
// }

// creneaux[0].zone = {
//   _id: "63e90d7be1f99513ec8e6114",
//   nomZone: "MONTPELLIER à LA plage",
//   jeux: [
//     {
//       nomJeu: "loup garou noir gros",
//       typeJeu: "Enfant",
//       _id: "63e90b476cfcbc29d95fc13f",
//     },
//   ],
// };

// creneaux[0].benevole = [
//   {
//     _id: "63e9055faea9502d143d9ef8",
//     prenomBenevole: "Corentin",
//     nomBenevole: "CLEMENT",
//     emailBenevole: "corentinclement2@gmail.com",
//   },
//   {
//     _id: "63e906baac8db23656419f41",
//     prenomBenevole: "Corentin",
//     nomBenevole: "CLEMENT",
//     emailBenevole: "corentinclement6@gmail.com",
//   },
//   {
//     _id: "63e90b076cfcbc29d95fc133",
//     prenomBenevole: "Corentin",
//     nomBenevole: "CLEMENT",
//     emailBenevole: "corentinclement20@gmail.com",
//   },
//   {
//     _id: "63e90b1a6cfcbc29d95fc136",
//     prenomBenevole: "Corentin",
//     nomBenevole: "CLEMENT",
//     emailBenevole: "corentinclement200@gmail.com",
//   },
// ];

export const benevoles = [
  {
    _id: "63e9055faea9502d143d9ef8",
    prenomBenevole: "Corentin",
    nomBenevole: "CLEMENT",
    emailBenevole: "corentinclement2@gmail.com",
  },
  {
    _id: "63e906baac8db23656419f41",
    prenomBenevole: "Corentin",
    nomBenevole: "CLEMENT",
    emailBenevole: "corentinclement6@gmail.com",
  },
  {
    _id: "63e90b076cfcbc29d95fc133",
    prenomBenevole: "Corentin",
    nomBenevole: "CLEMENT",
    emailBenevole: "corentinclement20@gmail.com",
  },
  {
    _id: "63e90b1a6cfcbc29d95fc136",
    prenomBenevole: "Corentin",
    nomBenevole: "CLEMENT",
    emailBenevole: "corentinclement200@gmail.com",
  },
];

// const columns = [
//   {
//     _id: 0,
//     nom: "Liste Bénévoles",
//     benevoleIds: benevoles.map((benevole) => benevole._id),
//   },
//   {
//     _id: "63e90d7be1f99513ec8e6114",
//     nom: "MONTPELLIER à LA plage",
//     benevoleIds: [],
//   },
//   {
//     _id: "63e9207dc125f684c00f38e8",
//     nom: "Montpellier",
//     benevoleIds: [],
//   },
//   {
//     _id: "63fa59b4c9a12a6a616ff9b2",
//     nom: "GRENOBLE LA CITE",
//     benevoleIds: [],
//   },
//   {
//     _id: "63fa59bdc9a12a6a616ff9b4",
//     nom: "kyzylorda du Kazakhstan",
//     benevoleIds: [],
//   },

//   //   // Pour organiser les colonnes
//   //   // TODO: ici mettre la liste des benevoles puis les zones (mettre ds l'ordre croissant des ids devrait faire l'affaire)
//   //   columnsOrder: [0, 1, 2, 3, 4]
// ];

// const data = {
//   creneaux: creneaux,
//   benevoles: benevoles,
//   columns: columns,
// };

// export default data;

const datas = [
  {
    _id: "63e90d7be1f99513ec8e6114",
    nomZone: "MONTPELLIER à LA plage",
  },
  {
    _id: "63e9207dc125f684c00f38e8",
    nomZone: "Montpellier",
  },
  {
    _id: "63fa59b4c9a12a6a616ff9b2",
    nomZone: "GRENOBLE LA CITE",
  },
  {
    _id: "63fa59bdc9a12a6a616ff9b4",
    nomZone: "kyzylorda du Kazakhstan",
  },
];

// const creneaux = [];
// const jours = [11, 12];
// let id = 1;
// for (let jour of jours) {
//   for (let heure = 8; heure < 20; heure++) {
//     const date = new Date(2023, 2, jour, heure);
//     const creneau = {
//       id: id,
//       date: date,
//       benevoles: [],
//     };
//     creneaux.push(creneau);
//     id++;
//   }
// }

const creneaux = [];
const jours = [11];
let id = 1;
for (let jour of jours) {
  for (let heure = 8; heure < 10; heure++) {
    const date = new Date(Date.UTC(2023, 2, jour, heure));
    const creneau = {
      _id: id,
      date: date,
      benevoles: [],
    };
    creneaux.push(creneau);
    id++;
  }
}

datas.forEach((zone) => {
  zone.creneaux = creneaux.map((creneau) => {
    const clone = JSON.parse(JSON.stringify(creneau));
    clone.benevoles = [];
    return clone;
  });
});

// datas[0].creneaux[0].benevoles = [
//   {
//     _id: "63e9055faea9502d143d9ef8",
//     prenomBenevole: "Corentin",
//     nomBenevole: "CLEMENT",
//     emailBenevole: "corentinclement2@gmail.com",
//   },
//   {
//     _id: "63e906baac8db23656419f41",
//     prenomBenevole: "Corentin",
//     nomBenevole: "CLEMENT",
//     emailBenevole: "corentinclement6@gmail.com",
//   },
//   {
//     _id: "63e90b076cfcbc29d95fc133",
//     prenomBenevole: "Corentin",
//     nomBenevole: "CLEMENT",
//     emailBenevole: "corentinclement20@gmail.com",
//   },
// ];

// datas[0].creneaux[1].benevoles = [
//   {
//     _id: "63e90b1a6cfcbc29d95fc136",
//     prenomBenevole: "Corentin",
//     nomBenevole: "CLEMENT",
//     emailBenevole: "corentinclement200@gmail.com",
//   },
// ];

export default datas;
