import React, { Component } from "react";

import AuthService from "../../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Main.css";
import { Button, Form } from "react-bootstrap";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required !
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      successful: false,
      message: "",
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });
    /* this.form.validateAll(); */

    AuthService.register(this.state.username, this.state.password).then(
      (response) => {
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.message.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });

    AuthService.login(this.state.username, this.state.password).then(
      () => {
        console.log("OK");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.message.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    return (
      <div>
        <div className="login">
          {/* <Form
          onSubmit={this.handleRegister}
          ref={(c) => {
            this.form = c;
          }}
          style={{ justifyContent: "center" }}
        >
          {" "}
          <div className="mb-3" controlId="formBasicEmail">
            <label>Email address</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="mb-3" controlId="formBasicPassword">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required]}
            />
          </div>
          <CheckButton
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form> */}
          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
            className="LoginMargin"
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
                type="texte"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button
              ref={(c) => {
                this.checkBtn = c;
              }}
              variant="success"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
