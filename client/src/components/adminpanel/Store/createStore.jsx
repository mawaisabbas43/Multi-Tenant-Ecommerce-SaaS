import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import auth from "../../../services/authService";

class CreateStore extends Component {
  state = {
    image2: "/images/theme-02.png",
    image3: "/images/theme-03.png",
    image4: "/images/img-4.jpg",
    store: {
      name: "",
      description: "",
      theme: ""
    },
    user: "",
    error: ""
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({
      user
    });
  }
  handleChange = e => {
    const store = { ...this.state.store };
    store[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      store
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const store = this.state.store;
    const user = this.state.user;

    try {
      await storeService.createStore(store, user);
      window.location = "/indexStore";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({
          error: ex.response.data
        });
        alert(this.state.error);
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid backgroundColor ">
          <div className="d-flex justify-content-center align-items-center  ">
            <div className="row  ">
              <div className="createStoreForm border">
                <div className="row formSize">
                  <div className="col-md-1">
                    <i className="fas fa-shopping-cart text-primary storeHeading"></i>
                  </div>
                  <div className="col-9">
                    <p className="text-primary text-uppercase font-weight-bold storeHeading">
                      Create Your Store
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="name"
                          onChange={this.handleChange}
                          value={this.state.store.name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                          Desciprtion:
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="description"
                          onChange={this.handleChange}
                          value={this.state.store.description}
                        ></textarea>
                      </div>
                      <div>
                        <label htmlFor="exampleFormControlTextarea1">
                          Select Your Theme:
                        </label>
                        <br />
                        <h5 className="text-dark">First theme</h5>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="theme"
                            id="exampleRadios1"
                            value="theme-01"
                            onChange={this.handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            <img
                              src={this.state.image2}
                              alt="no alternate"
                              width="200px"
                            />
                          </label>
                        </div>
                        <br />
                        <h5 className="text-dark">Second Theme</h5>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="theme"
                            id="exampleRadios2"
                            value="theme-02"
                            onChange={this.handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            <img
                              src={this.state.image3}
                              alt="no alternate"
                              width="200px"
                            />
                          </label>
                        </div>
                        <br />
                        <h5 className="text-dark">Third Theme</h5>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="theme"
                            value="theme-03"
                            onChange={this.handleChange}
                          />
                          <label className="form-check-label">
                            <img
                              src={this.state.image3}
                              alt="no alternate"
                              width="200px"
                            />
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Next
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateStore;
