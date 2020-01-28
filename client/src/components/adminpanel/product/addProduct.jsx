import React, { Component } from "react";
class AddPRoduct extends Component {
  state = {
    product: {
      fname: "",
      lname: "",
      summary: "",
      description: "",
      price: "",
      sku: "",
      count: ""
    }
  };
  handleChangeName = e => {
    const product = { ...this.state.product };
    product[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      product
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const product = { ...this.state.product };
    console.log(product);
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product First name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  name="fname"
                  onChange={this.handleChangeName}
                  value={this.state.product.fname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Product Last name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  name="lname"
                  onChange={this.handleChangeName}
                  value={this.state.product.lname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Summary:</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  name="summary"
                  onChange={this.handleChangeName}
                  value={this.state.product.summary}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Desciprtion:
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  name="description"
                  onChange={this.handleChangeName}
                  value={this.state.product.description}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="email">Product price:</label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  name="price"
                  onChange={this.handleChangeName}
                  value={this.state.product.price}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Product SKU#:</label>
                <input
                  type="text"
                  className="form-control"
                  id="sku"
                  name="sku"
                  onChange={this.handleChangeName}
                  value={this.state.product.sku}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Product count:</label>
                <input
                  type="number"
                  className="form-control"
                  id="count"
                  name="count"
                  onChange={this.handleChangeName}
                  value={this.state.product.count}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddPRoduct;
