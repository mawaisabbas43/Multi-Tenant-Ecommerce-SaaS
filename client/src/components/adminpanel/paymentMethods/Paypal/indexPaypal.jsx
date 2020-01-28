import React, { Component } from "react";
import * as storeService from "../../../../services/storeService";
import * as paypalService from "../../../../services/paypalService";
import auth from "../../../../services/authService";
import { Link } from "react-router-dom";

class IndexPaypal extends Component {
  state = {
    store: {},
    paypal: {},
    paypalData: {},
    paypalId: ""
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });

    const storeObject = this.state.store;

    const { data: paypal } = await paypalService.getPaypal(storeObject);

    this.setState({ paypalData: paypal["paypal"] });
    this.setState({ paypalId: paypal["_id"] });
    this.setState({
      paypal
    });
  }
  render() {
    const { paypalData, paypal } = this.state;

    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Paypal Detail</h6>
          </div>
          {!paypal.paypal && <Link to="addPaypal">Add Paypal Detail</Link>}

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
                  {paypalData && (
                    <tr>
                      <td>{paypalData.publicKey}</td>
                      <td>{paypalData.secretKey}</td>

                      <td>
                        <Link to="/editPaypalDetail" className="btn btn-info">
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

export default IndexPaypal;
