import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import * as aboutService from "../../../services/aboutService";
import auth from "../../../services/authService";
class CreateAbout extends Component {
  state = {
    about: {
      description: "",
      info: "",
      moreInfo: ""
    },
    store: {}
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });
  }
  handleChange = e => {
    const about = { ...this.state.about };
    about[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      about
    });
  };
  handleSubmit = async e => {
    e.preventDefault();

    const store = this.state.store;
    const about = this.state.about;
    console.log(store);
    console.log(about);
    try {
      await aboutService.createAbout(about, store);
      this.props.history.push("/About-Us");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        alert(ex.response.data);
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  Decription:
                </label>
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="description"
                  placeholder="Enter description of About-Us Page"
                  onChange={this.handleChange}
                  value={this.state.description}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  Info:
                </label>
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="info"
                  placeholder=" Enter Important information of your store"
                  onChange={this.handleChange}
                  value={this.state.info}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  More Info:
                </label>
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="moreInfo"
                  placeholder="Enter more information"
                  onChange={this.handleChange}
                  value={this.state.moreInfo}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateAbout;
