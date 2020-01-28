import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
class editStore extends Component {
  state = {
    image2: "/images/theme-02.png",
    image3: "/images/theme-03.png",
    store: {
      name: "",
      description: "",
      theme: ""
    }
  };

  async componentDidMount() {
    const { data: store } = await storeService.getStore(
      this.props.match.params.id
    );
    this.setState({ store });
  }

  handleChange = e => {
    const store = { ...this.state.store };
    store[e.currentTarget.name] = e.currentTarget.value;

    this.setState({
      store: {
        name: store.name,
        description: store.description,
        theme: store.theme
      }
    });
  };
  handleSubmit = async e => {
    e.preventDefault();

    const store = this.state.store;
    try {
      await storeService.updateStore(this.props.match.params.id, store);
      this.props.history.push("/indexStore");
    } catch (ex) {
      if (ex.response && ex.response === 400) {
        alert(ex.response.data);
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="conatiner">
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
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="theme"
                    id="exampleRadios1"
                    value="theme-01"
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    <img
                      src={this.state.image2}
                      alt="no alternate"
                      width="200px"
                    />
                  </label>
                </div>
                <br />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="theme"
                    id="exampleRadios2"
                    value="theme-02"
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    <img
                      src={this.state.image2}
                      alt="no alternate"
                      width="200px"
                    />
                  </label>
                </div>
                <br />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="theme"
                    id="exampleRadios3"
                    onChange={this.handleChange}
                    value="theme-03"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios3">
                    <img
                      src={this.state.image3}
                      alt="no alternate"
                      width="250px"
                    />
                  </label>
                </div>
                <br />
              </div>

              <button type="submit" className="btn btn-info ">
                Update
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default editStore;
