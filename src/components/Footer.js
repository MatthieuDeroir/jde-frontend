import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter  className="footer ">
      <div
        className=" textWhite text-center p-3 "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="textWhite" href="https://www.stramatel.com/">
          stramatel.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
