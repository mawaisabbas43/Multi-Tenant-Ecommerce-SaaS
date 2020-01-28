import React, { Component } from "react";
import * as storeService from "../../../../services/storeService";
import * as stripeService from "../../../../services/stripeService";
import auth from "../../../../services/authService";
import { Link } from "react-router-dom";
class IndexStripe extends Component {
  state = {
    store: {},
    stripeData: {},
    stripeId: ""
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });

    const storeObject = this.state.store;

    const { data: stripe } = await stripeService.getStripe(storeObject);

    this.setState({ stripeData: stripe["stripe"] });
    this.setState({ stripeId: stripe["_id"] });
  }
  render() {
    const { stripeData } = this.state;

    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Stripe Detail</h6>
          </div>
          {!stripeData && <Link to="addStripe">Add Stripe info</Link>}

          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                width="100%"
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th>public key</th>
                    <th>Secret Key</th>

                    <th>Edit</th>
                  </tr>
                  {stripeData && (
                    <tr>
                      <td>{stripeData.publicKey}</td>
                      <td>{stripeData.secretKey}</td>

                      <td>
                        <Link to="/editStripeDetail" className="btn btn-info">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  )}
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IndexStripe;
