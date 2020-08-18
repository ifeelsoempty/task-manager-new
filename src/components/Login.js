import React, { Component } from "react";
import ReactDOM from "react-dom";
import Boards from "./Boards";
import Axios from "axios";

class Login extends Component {
  state = {
    boards: "",
    username: "",
    password: "",
    error: "",
  };

  logIn = () => {
    const { username, password } = this.state;

    const user = {
      username: username,
      password: password,
    };

    if (username.trim() !== "" && password.trim() !== "") {
      fetch(`http://app-react/api/signIn`, {
        method: "POST",
        body: JSON.stringify(user),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            document.cookie = `userId=${res}`;
            this.getBoards();
          } else {
            this.setState({ error: "Неправильный логин или пароль" });
          }
        });
    } else {
      this.setState({ error: "Введите данные" });
    }
  };

  getBoards = () => {
    Axios.post(`http://app-react/api/boards/get?${document.cookie}`, {
      method: "POST",
    }).then((res) =>
      ReactDOM.render(
        <Boards boards={res.data} />,
        document.getElementById("app")
      )
    );
  };

  render() {
    return (
      <div id="app">
        {document.cookie.includes("userId") ? (
          this.getBoards()
        ) : (
          <div className="login">
            <title>Username</title>
            <input
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <title>Password</title>
            <input
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
            />
            <div className="login-lower-block">
              <title className="login-error">{this.state.error}</title>
              <button onClick={this.logIn}>Log in</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
