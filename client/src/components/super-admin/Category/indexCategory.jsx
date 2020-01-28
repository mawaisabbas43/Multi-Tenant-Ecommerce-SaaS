import React, { Component } from "react";
import * as categoryService from "../../../services/categoryService";
import List from "./List";
class StoreCategory extends Component {
  state = {
    categories: []
  };
  async componentDidMount() {
    const { data: categories } = await categoryService.getAdminCategories(
      this.props.match.params.id
    );
    this.setState({ categories });
    console.log(this.state.categories);
  }
  render() {
    return (
      <React.Fragment>
        <h1>Category</h1>
        <List data={this.state.categories} />
      </React.Fragment>
    );
  }
}

export default StoreCategory;
