import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Components
import Connexion from './component/Connexion';
import Maintenance from './component/MaintenancePage';
import Home from './component/Home';
import Jeux from './component/Jeux';
import Zones from './component/Zones';
import Benevoles from './component/Benevoles';
import AdminHome from './component/AdminHome';
import Affectations from './component/Affectation V3/Affectations';
import ErrorPage from "./component/error-page";

import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
 
/* Doc React-router-v6
https://reactrouter.com/en/main/start/tutorial
*/


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },{
    path: "/connexion",
    element: <Connexion />,
    errorElement: <ErrorPage />,
  },{
    path: "/maintenance",
    element: <Maintenance />,
    errorElement: <ErrorPage />
  },{
    path: "/jeux",
    element: <Jeux />,
    errorElement: <ErrorPage />
  },{
    path: "/zones",
    element: <Zones />,
    errorElement: <ErrorPage />
  },{
    path: "/benevoles",
    element: <Benevoles />,
    errorElement: <ErrorPage />
  },{
    // TODO: vérif que les paths te vont et que jles ai fait correctement
    path: "/admin",
    element: <AdminHome />,
    errorElement: <ErrorPage />
  },{
    path: "/affectations",
    element: <Affectations />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
