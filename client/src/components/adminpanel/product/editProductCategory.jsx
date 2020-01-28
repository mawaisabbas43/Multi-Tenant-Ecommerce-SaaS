import React, { Component } from "react";
import * as productService from "../../../services/productService";
import * as categoryService from "../../../services/categoryService";
import EditCategoryList from "./editCategoryList";
import auth from "../../../services/authService";
import * as storeService from "../../../services/storeService";
import _ from "lodash";

class EditProductCategory extends Component {
  state = {
    dataTree: [],
    selectedCategory: []
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);
    this.setState({ store: store[0] });
    const storeObject = this.state.store;
    const { data: categories } = await categoryService.getCategories(
      storeObject
    );
    this.setState({ dataTree: categories });
  }

  handleSelectCategory = (e, id) => {
    console.log(id);
    let selectedCategory = [...this.state.selectedCategory];
    this.setState({
      selectedCategory: [...selectedCategory, id]
    });
  };
  handleSubmitForm = async e => {
    e.preventDefault();

    const selectedCategory = this.state.selectedCategory;
    console.log("onSubmit category", selectedCategory);

    await productService.updateProductCategory(
      this.props.match.params.id,
      _.uniq(selectedCategory)
    );
    this.props.history.push("/indexProduct");
  };
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 container">
          <h1>Edit Product Category </h1>
          <div className="row m-5">
            <div className="col-md-8">
              <form onSubmit={this.handleSubmitForm}>
                Select category:
                {this.state.dataTree.length !== 0 && (
                  <EditCategoryList
                    data={this.state.dataTree}
                    select={this.handleSelectCategory}
                  />
                )}
                <button type="submit" className="btn btn-primary btn-block">
                  Update
                </button>
              </form>
            </div>
            <div className="col-md-4" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditProductCategory;
