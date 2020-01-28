import React, { Component } from "react";
import * as storeService from "../../../../services/storeService";
import * as cashOnDeliveryService from "../../../../services/cashOnDeliveryService";
import auth from "../../../../services/authService";
class AddCashOnDelivery extends Component {
  state = {
    cashOnDelivery: false,

    store: {}
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });
  }
  handleChange = e => {
    this.setState({
      cashOnDelivery: !this.state.cashOnDelivery
    });
    console.log("on change cash on delivery---->", this.state.cashOnDelivery);
  };
  handleSubmit = async e => {
    e.preventDefault();
    const store = this.state.store;
    const cashOnDelivery = this.state.cashOnDelivery;
    let obj = { cashOnDelivery };
    console.log("on submit-------->", obj);

    await cashOnDeliveryService.updateCashOnDelivery(store._id, obj);
    // this.props.history.push("/indexPaypal");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Add Cash</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="text-dark">
              Add Cash on delivery option
            </label>
            <br />
            <input
              type="checkbox"
              name="cashOnDelivery"
              onChange={this.handleChange}
              value={this.state.cashOnDelivery}
            />{" "}
            Add Cash on delivery option
          </div>

          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddCashOnDelivery;
