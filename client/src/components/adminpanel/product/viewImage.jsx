import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import * as productService from "../../../services/productService";
import auth from "../../../services/authService";
import { Link } from "react-router-dom";
class ViewImage extends Component {
  state = {
    product: {}
  };
  async componentDidMount() {
    // const user = await auth.getCurrentUser();
    // const { data: store } = await storeService.getUserStore(user);
    // this.setState({ store: store[0] });
    // const storeObject = this.state.store;
    const { data: product } = await productService.getSingleProduct(
      this.props.match.params.id
    );
    this.setState({ product });
    console.log("View image---->", this.state.product);
  }
  render() {
    const { product } = this.state;
    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Product Detail
            </h6>
            <div className="row">
              <div className="col-md-3 ml-2 mt-2">
                <Link to="/indexProduct" className="btn btn-primary">
                  Back <i className="fas fa-backward" />
                </Link>
              </div>
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

                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{product.fname}</td>
                    <td>{product.lname}</td>
                    <td>
                      {product.images &&
                        product.images.map((p, i) => {
                          return (
                            <React.Fragment>
                              <ul key={i}>
                                <li>
                                  {" "}
                                  <img
                                    src={`/server/${p.url}`}
                                    alt={p.caption}
                                    width="250px"
                                    height="250px"
                                  />
                                </li>
                              </ul>
                            </React.Fragment>
                          );
                        })}
                    </td>
                  </tr>
                  {/* {this.state.products !== 0 &&
                    this.state.products.map(p => {
                      return (
                        <React.Fragment>
                          <tr key={p._id}>
                            <td>{p.fname}</td>
                            <td>{p.lname}</td>

                            <td>
                              {p.images.map((a, i) => {
                                return (
                                  <ul key={i}>
                                    <li>
                                      <img
                                        src={`/server/${a.url}`}
                                        alt={a.caption}
                                        width="250px"
                                        height="250px"
                                      />
                                    </li>
                                  </ul>
                                );
                              })}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewImage;
