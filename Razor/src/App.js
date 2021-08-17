import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { UserContext } from "./UserContext";
//import Admin from "layouts/Admin.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";
// import { DesktopWindows } from "@material-ui/icons";
import { PinDropSharp } from "@material-ui/icons";
import Razor from "views/Razor"



function AppRouter() {
  //let history={hist}
	
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);


  return (
    <Razor />
  );

}

export default AppRouter;
