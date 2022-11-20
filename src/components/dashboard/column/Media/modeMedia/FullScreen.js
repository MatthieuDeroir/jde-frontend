import { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { MdFileDownload } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import authService from "../../../../../services/authService";
import fileService from "../../../../../services/fileService";
import uploadService from "../../../../../services/uploadService";
/* import { FaSave } from "react-icons/fa"; */
import { useImmer } from "use-immer";

/* var bcrypt = require("bcryptjs"); */
function FullScreen({ ModeChoice, changeMode }) {
  var [State, setState] = useImmer([]);

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getFile() {
    fileService.get().then((result) => {
      setState(result.data.slice(0, 1));
    });
  }

  function onFileUpload(value, file) {
    //Nom fichier aléatoire
    if (value.target.files[0] != null) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      const fileName = "fullScreen_" + text;
      const format = value.target.files[0].type.split("/").pop();
      //delete file
      uploadService.delete(file);
      setState((draft) => {
        const dock = draft.find((dock) => dock._id === file._id);
        dock.file = value.target.files[0];
        dock.fileName = fileName;
        dock.format = format;
        dock.user = authService.getCurrentUser().username;
        dock.path = "/media/" + fileName + "." + format;
        /* dock.select = true; */
        saveFiles(dock);
      });
    }
  }
  async function saveFiles(file) {
    // eslint-disable-next-line eqeqeq
    if (file.fileName != "file") {
      uploadService.upload(file);
    }
    fileService.update(file);
  }

  return (
    <div>
      <Form>
        <Table striped>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Overview</th>
            </tr>
          </thead>

          <tbody>
            {State.map((file, index) => (
              <tr key={file._id}>
                <td>
                  <p key={index}>{file.fileName}</p>
                </td>
                <td>
                  {/* <input
                    id="file-input"
                    type="file"
                    onChange={(e) => onFileUpload(e, file)}
                  />
                  <img className="imgUpload" alt="test" src={file.path} /> */}

                  <input
                    type="file"
                    id={"file" + index}
                    onChange={(e) => onFileUpload(e, file)}
                    style={{ display: "none" }}
                  />
                  <label htmlFor={"file" + index}>
                    {file.fileName == "file" ? (
                      <span className="fa fa-edit edit-icon">
                        <MdFileDownload className="downloadIcone" />
                      </span>
                    ) : (
                      <img className="imgUpload" alt="test" src={file.path} />
                    )}
                  </label>
                </td>
              </tr>
            ))}

            {/*  <td>
                <Button className="ButtonUp" variant="secondary">
                  <MdOutlineDeleteOutline />
                </Button>
              </td> */}
          </tbody>
        </Table>
      </Form>
      <Button
        className="buttonActive margin50"
        variant="success"
        onClick={() => changeMode("2")}
      >
        <AiOutlineCheck />
      </Button>
      {/* <Button className="buttonActive " variant="success" onClick={() => handleSubmit()}>
        <FaSave />
      </Button> */}
    </div>
  );
}

export default FullScreen;
