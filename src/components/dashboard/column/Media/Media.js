import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "../../../../styles/Main.css";
import Nav from "react-bootstrap/Nav";
import SplitScreen from "./modeMedia/SplitScreen";
import TimeScreen from "./modeMedia/TimeScreen";
import FullScreen from "./modeMedia/FullScreen";
import axios from "axios";
import { useEffect } from "react";

function Media() {
  const [ModeChoice, setModeChoice] = useState([]);
  const [NavMode, setNavMode] = useState();
  useEffect(() => {
    getMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const URL_API = "http://localhost:4000";

  async function getMode() {
    const data = {};
    await axios.get(URL_API + "/modes", JSON.stringify(data)).then((result) => {
      setModeChoice(result.data);
      nav(result.data[0].activeMode)
    });
  }
  async function changeMode(mode){
   
    await axios
    .put(URL_API + "/mode/"+ ModeChoice[0]._id, {
      activeMode: mode
    })
    .then((result) => {
      console.log(result.data);
    });
    getMode()

  }
  

  function nav(mode) {
    if (mode === "1") {
      setNavMode(
        <SplitScreen ModeChoice={ModeChoice} changeMode={changeMode} />
      );
    }

    if (mode === "2") {
      setNavMode(
        <FullScreen ModeChoice={ModeChoice} changeMode={changeMode} />
      );
    }

    if (mode === "3") {
      setNavMode(
        <TimeScreen ModeChoice={ModeChoice} changeMode={changeMode} />
      );
    }
  }

  return (
    <div className="Media Truck">
      <h5 className="titleColumn">Média</h5>
      {ModeChoice.map((Choice) => (
      <Nav key={Choice._id} fill variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="1" onClick={() => nav("1")}>
            {" "}
            {Choice.activeMode === "1" ? (
              <strong className="ModeChoice">3 images </strong>
            ) : (
              "3 Images"
            )}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" onClick={() => nav("2")}>
            {Choice.activeMode === "2" ? (
              <strong className="ModeChoice">1 Image</strong>
            ) : (
              "1 Image"
            )}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" onClick={() => nav("3")}>
            {Choice.activeMode === "3" ? (
              <strong className="ModeChoice">Camion et média </strong>
            ) : (
              "Camion et média "
            )}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      ))}
      <div className="tabMedia">{NavMode}</div>
    </div>
  );
}

export default Media;
