import React, { Component } from "react";
import * as storeService from "../../../../services/storeService";
import * as stripeService from "../../../../services/stripeService";
import auth from "../../../../services/authService";
class EditStripe extends Component {
  state = {
    stripe: {
      publicKey: "",
      secretKey: ""
    },
    store: {}
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });

    const storeObject = this.state.store;

    const { data: stripe } = await stripeService.getStripe(storeObject);

    this.setState({ stripe: stripe["stripe"] });
  }

  handleChange = e => {
    const stripe = { ...this.state.stripe };
    stripe[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      stripe
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const store = this.state.store;
    const stripe = this.state.stripe;
    let obj = { stripe };

    console.log(store);
    console.log(obj);

    await stripeService.updateStripe(store._id, obj);
    this.props.history.push("/indexStripe");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Edit Stripe</h1>

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
              value={this.state.stripe.publicKey}
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
              value={this.state.stripe.secretKey}
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

export default EditStripe;
