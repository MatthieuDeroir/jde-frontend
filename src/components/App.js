import Login from "./Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import Hearder from "./Header";
import Footer from "./Footer";
import AuthService from "../services/authService";



function App() {
  const [token, ] = useState(AuthService.getCurrentUser());

  if (token == null) {
    return (
      <div className="App">
        <Hearder token={token}/>
        <Login />
        <Footer />
      </div>
    );
  } else
    return (
      <div className="App">
        <Hearder token={token}/>
        <Dashboard />
        <Footer />
      </div>
    );
}

export default App;
