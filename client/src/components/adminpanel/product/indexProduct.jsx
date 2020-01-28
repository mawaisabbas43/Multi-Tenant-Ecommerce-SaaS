import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as storeService from "../../../services/storeService";
import * as productService from "../../../services/productService";
import auth from "../../../services/authService";
class Product extends Component {
  state = {
    products: []
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);
    this.setState({ store: store[0] });
    const storeObject = this.state.store;
    const { data: products } = await productService.getProduct(storeObject);
    this.setState({ products });
  }
  handleDelete = async p => {
    await productService.deleteProduct(p._id);
    window.location = "/indexProduct";
  };
  render() {
    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Product Detail
            </h6>
          </div>
          <div className="row">
            <div className="col-md-3 ml-2 mt-2">
              <Link to="createProduct" className="btn btn-primary">
                Add Product <i className="fas fa-plus-square" />
              </Link>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                width="100%"
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Brand Name</th>
                    <th>Product SKU</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Summary</th>
                    <th>Description</th>
                    <th>Atrributes</th>
                    <th>Variants</th>
                    <th>Edit Category</th>
                    <th>Add Image</th>
                    <th>Show Images</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products !== 0 &&
                    this.state.products.map(p => {
                      return (
                        <React.Fragment>
                          <tr key={p._id}>
                            <td>{p.fname}</td>
                            <td>{p.lname}</td>
                            <td>{p.sku}</td>
                            <td>{p.price}</td>
                            <td>{p.count}</td>
                            <td>{p.summary}</td>
                            <td>{p.description}</td>
                            <td>
                              {p.attributes.map((a, i) => {
                                return (
                                  <ul key={i}>
                                    <li>
                                      {a.name}&nbsp;&nbsp;{a.value}
                                    </li>
                                  </ul>
                                );
                              })}
                            </td>
                            <td>
                              {p.variants.map((v, j) => {
                                return (
                                  <ul key={j}>
                                    <li>{v.name}</li>
                                    {v.options.map((o, k) => {
                                      return (
                                        <React.Fragment>
                                          <li key={k}>{o}</li>
                                        </React.Fragment>
                                      );
                                    })}
                                  </ul>
                                );
                              })}
                            </td>
                            <td>
                              <Link to={`/editProductCategory/${p._id}`}>
                                Edit Category
                              </Link>
                            </td>
                            <td>
                              <Link to={`/addImage/${p._id}`}>
                                Add Image/Edit Images
                              </Link>
                            </td>
                            <td>
                              <Link to={`/showImages/${p._id}`}>
                                Show Images
                              </Link>
                            </td>
                            <td>
                              <Link to={`/editProduct/${p._id}`}>Edit</Link>
                            </td>
                            <td>
                              <button
                                onClick={() => this.handleDelete(p)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;
