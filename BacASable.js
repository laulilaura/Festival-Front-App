// const affectation = [
//   {
//     _id: 1,
//     date: "2023-03-11T08:00:00.000Z",
//     zone: "63e90d7be1f99513ec8e6114",
//     benevoles: [
//       {
//         _id: "63e9055faea9502d143d9ef8",
//         prenomBenevole: "Corentin",
//         nomBenevole: "CLEMENT",
//         emailBenevole: "corentinclement2@gmail.com",
//       },
//       {
//         _id: "63e906baac8db23656419f41",
//         prenomBenevole: "Corentin",
//         nomBenevole: "CLEMENT",
//         emailBenevole: "corentinclement6@gmail.com",
//       },
//     ],
//   },
//   {
//     _id: 2,
//     date: "2023-03-11T09:00:00.000Z",
//     zone: "63e90d7be1f99513ec8e6112",
//     benevoles: []
//   }
// ];

// console.log(affectation.find((affectation) => affectation.zone === "63e90d7be1f99513ec8e6114"))
// console.log(affectation.includes("63e90d7be1f99513ec8e6114"))

const zones = [
  {
    _id: {
      $oid: "63e90d7be1f99513ec8e6114",
    },
    nomZone: "MONTPELLIER à LA plage",
    jeux: [
      {
        nomJeu: "loup garou noir gros",
        typeJeu: "Enfant",
        _id: {
          $oid: "63e90b476cfcbc29d95fc13f",
        },
      },
    ],
  },
  {
    _id: {
      $oid: "63e9207dc125f684c00f38e8",
    },
    nomZone: "Montpellier",
    jeux: [
      {
        nomJeu: "Loto pour adulte",
        typeJeu: "Ambiance",
        _id: {
          $oid: "63fa358a6e5783137464a37c",
        },
      },
      {
        nomJeu: "loup garou noir gros",
        typeJeu: "Enfant",
        _id: {
          $oid: "63e90b476cfcbc29d95fc13f",
        },
      },
    ],
  },
  {
    _id: {
      $oid: "63fa59b4c9a12a6a616ff9b2",
    },
    nomZone: "GRENOBLE LA CITE",
    jeux: [
      {
        nomJeu: "League of Legend",
        typeJeu: "Expert",
        _id: {
          $oid: "63fa359d6e5783137464a37e",
        },
      },
      {
        nomJeu: "Loto pour adulte",
        typeJeu: "Ambiance",
        _id: {
          $oid: "63fa358a6e5783137464a37c",
        },
      },
      {
        nomJeu: "loup garou noir aussi mais avec extension",
        typeJeu: "Enfant",
        _id: {
          $oid: "63fa35746e5783137464a37a",
        },
      },
      {
        nomJeu: "loup garou noir gros",
        typeJeu: "Enfant",
        _id: {
          $oid: "63e90b476cfcbc29d95fc13f",
        },
      },
    ],
  },
  {
    _id: {
      $oid: "63fa59bdc9a12a6a616ff9b4",
    },
    nomZone: "kyzylorda du Kazakhstan",
    jeux: [],
  },
];

const creneaux = [];

const jours =[11,12]
let id = 1;

for (let jour of jours) {
  for (let heure = 8; heure < 10; heure++) {
    let date = new Date(Date.UTC(2023, 2, jour, heure));
    date = `${date.getUTCDate()}/0${date.getUTCMonth()+1}/${date.getUTCFullYear()} ${date.getUTCHours()}h`
    const creneau = {
      _id: id,
      heureDebut: date,
      benevoles: [],
    };
    creneaux.push(creneau);
    id++;
  }
}

const datas = [];

for (let i = 0; i < zones.length; i++) {
  for (let j = 0; j < creneaux.length; j++) {
    const data = {
      zone: zones[i]._id.$oid,
      heureDebut: creneaux[j].heureDebut,
      benevoles: []
    };
    datas.push(data);    
  }
}

console.log(JSON.stringify(datas).replace(/'/g, '"'))
