import React, { Component } from "react";
import * as categoryService from "../../../services/categoryService";

class EditCategory extends Component {
  state = {
    category: {
      name: ""
    }
  };
  async componentDidMount() {
    const { data: category } = await categoryService.getSingleCategory(
      this.props.match.params.id
    );

    this.setState({
      category
    });
    console.log(this.state.category);
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

    const category = this.state.category;

    await categoryService.updateCategory(this.props.match.params.id, category);

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
                  placeholder="Enter Category name"
                  onChange={this.handleChange}
                  value={this.state.category.name}
                />
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

export default EditCategory;
