import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const user = auth.getCurrentUser();
      if (user.isAdmin) {
        window.location = "/indexSuperAdmin";
      } else {
        window.location = "/indexStore";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    // console.log("Submitted");
  };

  render() {
    return (
      <div className="mt-5">
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 border">
              <h1 className="text-center text-dark">Login</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Login")}
              </form>
            </div>

            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
