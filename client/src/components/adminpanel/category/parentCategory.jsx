import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import * as categoryService from "../../../services/categoryService";
import auth from "../../../services/authService";
class ParentCategory extends Component {
  state = {
    category: {
      name: ""
    },
    store: {}
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });
  }
  handleChange = e => {
    const category = { ...this.state.category };
    category[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      category
    });
  };
  handleSubmit = async e => {
    e.preventDefault();

    const store = this.state.store;
    const category = this.state.category;

    await categoryService.createCategory(category, store);
    this.props.history.push("/indexCategory");
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="name"
                  placeholder="Enter parent Category name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ParentCategory;
