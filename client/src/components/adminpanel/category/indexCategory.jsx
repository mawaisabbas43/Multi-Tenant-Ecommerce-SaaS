import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { paginate } from "../../../utils/paginate";
import * as storeService from "../../../services/storeService";
import * as categoryService from "../../../services/categoryService";
import auth from "../../../services/authService";
import OptionsList from "./OptionsList";

class Category extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    dataTree: [],
    store: {},
    control: {
      visibleRows: 1,
      showPagination: true,
      initialRowsPerPage: 4
    }
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
    // this.setState({ dataTree: this.state.dataTree.concat(categories) });
    // this.setState({ dataTree: [...this.state.dataTree, categories] });
    // console.log("In Component Did Mount", this.state.dataTree);
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    if (this.state.dataTree.length <= 0) return null;
    const categories = paginate(
      this.state.dataTree,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Categories</h6>
          </div>

          <div className="row">
            <div className="col-md-3 ml-2 mt-2">
              <Link to="parentCategory" className="btn btn-primary">
                Add Parent Category <i className="fas fa-plus-square" />
              </Link>
            </div>
          </div>
          <div className="card-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  {this.state.dataTree.length !== 0 && (
                    <OptionsList data={categories} />
                  )}
                </div>
              </div>
              <Pagination
                itemsCount={this.state.dataTree.length}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Category;
