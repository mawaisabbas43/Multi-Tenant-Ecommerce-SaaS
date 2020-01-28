import React, { Component } from "react";
import * as aboutService from "../../../services/aboutService";

class EditAbout extends Component {
  state = {
    about: {
      description: "",
      info: "",
      moreInfo: ""
    }
  };
  async componentDidMount() {
    const { data: about } = await aboutService.getSingleAbout(
      this.props.match.params.id
    );
    this.setState({ about });
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

    const about = this.state.about;

    try {
      await aboutService.updateAbout(this.props.match.params.id, about);
      this.props.history.push("/About-Us");
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
                  value={this.state.about.description}
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
                  value={this.state.about.info}
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
                  value={this.state.about.moreInfo}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditAbout;
