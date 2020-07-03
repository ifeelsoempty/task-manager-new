import React, { Component } from "react";
import ReactDOM from "react-dom";
import Boards from "./Boards";

class Login extends Component {
  state = {
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
      fetch(`http://app-react/api/boards/get`, {
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => this.createBoards(res));
    } else {
      this.setState({ error: "Введите данные" });
    }
  };

  createBoards = (boards) => {
    if (boards) {
      ReactDOM.render(
        <Boards boards={boards} />,
        document.getElementById("app")
      );
    } else {
      this.setState({ error: "Неправильный логин или пароль" });
    }
  };

  render() {
    return (
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
    );
  }
}

export default Login;
