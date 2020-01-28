import React, { Component } from "react";
import * as storeService from "../../../../services/storeService";
import * as paypalService from "../../../../services/paypalService";
import auth from "../../../../services/authService";
class AddPaypalCredentials extends Component {
  state = {
    paypal: {
      publicKey: "",
      secretKey: ""
    },
    store: {}
  };

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });
  }

  handleChange = e => {
    const paypal = { ...this.state.paypal };
    paypal[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      paypal
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const store = this.state.store;
    const paypal = this.state.paypal;
    let obj = { paypal };

    console.log(store);
    console.log(obj);

    await paypalService.updatePaypal(store._id, obj);
    this.props.history.push("/indexPaypal");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Add Paypal</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="text-dark">
              Public Key:
            </label>
            <input
              type="text"
              className="form-control"
              name="publicKey"
              placeholder="Enter public key of paypal account"
              onChange={this.handleChange}
              value={this.state.paypal.publicKey}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="text-dark">
              Secret Key:
            </label>
            <input
              type="text"
              className="form-control"
              name="secretKey"
              placeholder="Enter Secret key of paypal account"
              onChange={this.handleChange}
              value={this.state.paypal.secretKey}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddPaypalCredentials;
