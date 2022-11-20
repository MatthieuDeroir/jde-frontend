import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FaArrowUp, FaSave } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useImmer } from "use-immer";
import "../../../../styles/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Come from "./State/Come";
import Loading from "./State/Loading";
import Wait from "./State/Wait";
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
></link>;

function Truck() {
  const URL_API = "http://localhost:4000";

  useEffect(() => {
    waitLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var [LoadingTruck, setLoadingTruck] = useImmer([]);
  var [NextTruck, setNextTruck] = useImmer([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function HandleToggleNext(e, docks) {
    const id = docks.id;
    setNextTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);
      dock.plate = e.target.value;
    });
  }
  function HandleToggleNextDock(e, docks) {
    const id = docks.id;
    setNextTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);

      dock.dockIndex = e.target.value;
    });
  }
  function HandleToggleLoading(e, docks) {
    const id = docks.id;
    setLoadingTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);
      dock.plate = e.target.value;
    });
  }
  function HandleToggleLoadingDock(e, docks) {
    const id = docks.id;
    setLoadingTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);
      dock.dockIndex = e.target.value;
    });
  }
  async function DeleteNextTruck(docks){
    
    setLoadingTruck((draft) => {
        const dock = draft.find((dock) => dock._id === docks._id);
        dock.dockIndex = 0;
        dock.plate = "";
        dock.state = true;
        postTruck(dock)
      });
    
  }

  //Move next vers loading
  async function MoveNextToLoading(e, docks) {
    var id = docks.id;
    var id2 = docks.id;
    id2 = id2 - 6;

    LoadingTruck.forEach((dock, index) => {
      // eslint-disable-next-line eqeqeq
      if (docks.dockIndex == dock.dockIndex) {
        setLoadingTruck((draft) => {
          const dock = draft.find((dock) => dock.id === index);
          dock.dockIndex = 0;
          dock.plate = "";
          dock.state = true;
          postTruck(dock);
        });
      }
    });
    setNextTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id);
      dock.plate = "";
      dock.dockIndex = 0;
      postTruck(dock);
    });

    setLoadingTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id2);
      dock.plate = NextTruck[id2].plate;
      dock.dockIndex = NextTruck[id2].dockIndex;
      dock.state = false;
      postTruck(dock);
    });
    await delay(120000);
    setLoadingTruck((draft) => {
      const dock = draft.find((dock) => dock.id === id2);
      dock.state = true;
      postTruck(dock);
    });
  }
  //Au lancement mettre state en loading(true) au bout de 2 minutes
  async function waitLoading() {
    await getTruck();
    await delay(120000);
    for (let i = 0; i < 5; i++) {
      setLoadingTruck((draft) => {
        const dock = draft.find((dock) => dock.id === i);
        dock.state = true;
        postTruck(dock);
      });
    }
  }
  //GET all
  async function getTruck() {
    const data = {};
    await axios
      .get(URL_API + "/trucks", JSON.stringify(data))
      .then((result) => {
        setLoadingTruck(result.data.slice(0, 6));
        setNextTruck(result.data.slice(6, 12));
      });
  }
  //POST all
  async function postTrucks() {
    LoadingTruck.forEach((truck) => {
      postTruck(truck);
    });
    NextTruck.forEach((truck) => {
      postTruck(truck);
    });
  }
  //POST one
  async function postTruck(truck) {
    await axios
      .put(URL_API + "/truck/" + truck._id, {
        id: truck.id,
        dockIndex: truck.dockIndex,
        plate: truck.plate,
        state: truck.state,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  return (
    <div className="Truck">
      <h5 className="titleColumn">Camion</h5>
      <h6 className="titleColumn">Chargement</h6>
      <Form>
        <Table striped variant="dark">
          <thead>
            <tr>
              <th>Docks</th>
              <th>Référence</th>
              <th>State</th>
            </tr>
          </thead>

          {LoadingTruck.map((docks) => (
            <tbody key={docks._id} >
              <tr>
                <td className="inputDock">
                  {" "}
                  <Form.Control
                    className="Inputtruck"
                    type="number"
                    onChange={(e) => HandleToggleLoadingDock(e, docks)}
                    value={docks.dockIndex}
                  />{" "}
                </td>
                <td className="inputPlate">
                  <Form.Control
                    className="Inputtruck"
                    onChange={(e) => HandleToggleLoading(e, docks)}
                    value={docks.plate}
                  />
                </td>
                <td>{docks.state ? <Loading /> : <Come />}</td>
                <td>
                  <Button
                    className="ButtonUp"
                    onClick={() => DeleteNextTruck(docks)}
                    variant="secondary"
                  >
                    <MdOutlineDeleteOutline />
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <h6 className="titleColumn">Prochain</h6>
        <Table striped variant="dark">
          <thead>
            <tr>
              <th>Docks</th>
              <th>Référence</th>
              <th>State</th>
              <th></th>
            </tr>
          </thead>
          {NextTruck.map((docks) => (
            <tbody key={docks._id} >
              <tr>
                <td className="inputDock">
                  {" "}
                  <Form.Control
                    className="Inputtruck"
                    type="number"
                    onChange={(e) => HandleToggleNextDock(e, docks)}
                    value={docks.dockIndex}
                  />{" "}
                </td>
                <td className="inputPlate">
                  <Form.Control
                    className="Inputtruck"
                    onChange={(e) => HandleToggleNext(e, docks)}
                    value={docks.plate}
                  />
                </td>
                <td>{docks.plate ? <Wait /> : ""}</td>
                <td>
                  <Button
                    className="ButtonUp"
                    onClick={(e) => MoveNextToLoading(e, docks)}
                    variant="secondary"
                  >
                    <FaArrowUp />
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Form>
      <Button className="buttonActive" variant="success" onClick={postTrucks}>
        <FaSave />
      </Button>
    </div>
  );
}

export default Truck;
