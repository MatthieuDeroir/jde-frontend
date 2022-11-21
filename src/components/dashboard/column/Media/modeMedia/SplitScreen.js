import { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useImmer } from "use-immer";
import { MdFileDownload } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import authService from "../../../../../services/authService";
import fileService from "../../../../../services/fileService";
import uploadService from "../../../../../services/uploadService";
import "../../../../../styles/App.css";
function Normale({ ModeChoice, changeMode }) {
  const URL_API = "http://192.168.100.75:4000";
  var [State, setState] = useImmer([]);

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getFile() {
    fileService.get().then((result) => {
      setState(result.data.slice(1, 4));
    });
  }

  function onFileUpload(value, file) {
    if (value.target.files[0] != null) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      const fileName = "splitScreen_" + text;
      const format = value.target.files[0].type.split("/").pop();
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
              <th>Aperçu</th>
              <th></th>
            </tr>
          </thead>
          {State &&
            State.map((file, index) => (
              <tbody key={file._id}>
                <tr
                  /*  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop} */
                  key={file._id}
                /* draggable */
                >
                  <td>{file.fileName}</td>

                  <td>
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
                  <td>
                    {/*  <Button
                      className="ButtonUp"
                      variant="secondary"
                      onClick={(e) => DeleteFile(e, file)}
                    >
                      <MdOutlineDeleteOutline />
                    </Button>
                    {file.select ? <Button
                      onClick={() => handleSubmit(index)}
                      className="btn-large waves-effect blue-grey darken-4 waves-orange"
                    >
                      Ajouter ce média
                    </Button> : ""} */}
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </Form>
      <Button
        className="buttonActive"
        variant="success"
        type="submit"
        onClick={() => changeMode("1", ModeChoice)}
      >
        <AiOutlineCheck />
      </Button>
      {/* <Button variant="primary" type="submit" onClick={(e) => NewFile()}>
        Ajouter Document
      </Button> */}
    </div>
  );
}

export default Normale;
