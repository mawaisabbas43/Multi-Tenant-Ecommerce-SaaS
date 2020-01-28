import React, { Component } from "react";
import * as productService from "../../../services/productService";

class StoreProduct extends Component {
  state = {
    products: []
  };
  async componentDidMount() {
    const { data: products } = await productService.getStoreProduct(
      this.props.match.params.id
    );
    this.setState({ products });
    console.log(this.state.products);
  }
  render() {
    return (
      <React.Fragment>
        <h1>Store Product</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Product Detail
            </h6>
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
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map(p => {
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

export default StoreProduct;
