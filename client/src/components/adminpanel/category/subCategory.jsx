import React, { Component } from "react";
import * as categoryService from "../../../services/categoryService";
class SubCategory extends Component {
  state = {
    subcategory: {
      name: ""
    },
    category: {}
  };
  async componentDidMount() {
    const { data: category } = await categoryService.getSingleCategory(
      this.props.match.params.id
    );

    this.setState({
      category
    });
  }
  handleChange = e => {
    const subcategory = { ...this.state.subcategory };
    subcategory[e.currentTarget.name] = e.currentTarget.value;

    this.setState({
      subcategory
    });
  };
  handleSubmit = async e => {
    e.preventDefault();

    const subcategory = this.state.subcategory;
    const category = this.state.category;

    await categoryService.createSubCategory(subcategory, category);
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
                  placeholder="Enter Sub-Category name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Sub-Category
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SubCategory;
