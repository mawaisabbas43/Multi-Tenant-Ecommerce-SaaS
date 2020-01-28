import React, { Component } from "react";
import axios from "axios";
import * as storeService from "../../../services/storeService";
import auth from "../../../services/authService";

class StoreLogo extends Component {
  state = {
    selectedFile: null,
    storeId: ""
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);
    this.setState({ storeId: store[0]._id });
  }
  fileSelectedHandler = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  };
  handleSubmit = async e => {
    e.preventDefault();

    console.log(this.state.selectedFile);
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    await axios.put(
      "http://localhost:4000/api/stores/logo/" + this.state.storeId,
      data
    );
    this.props.history.push("/Logo");
  };
  render() {
    return (
      <React.Fragment>
        <h1 className="pl-5">Add your store logo</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Upload Your File </label>
            <input
              type="file"
              className="form-control"
              onChange={this.fileSelectedHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Upload <i className="fas fa-upload" />
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default StoreLogo;
