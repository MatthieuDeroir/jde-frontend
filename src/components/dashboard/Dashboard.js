import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Truck from "./column/trcuck/Truck";
import Media from "./column/Media/Media";
import Screen from "./column/Screen/Screen";
import "../../styles/App.css";
import "../../styles/Main.css";

function Dashboard() {
  return (
    <div>
      <Row className="row2">
        <Col sm={3} className="Column" >
          <Truck />
        </Col>
        <Col sm className="Column">
          <Screen />
        </Col>
        <Col sm className="Column">
          <Media />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
