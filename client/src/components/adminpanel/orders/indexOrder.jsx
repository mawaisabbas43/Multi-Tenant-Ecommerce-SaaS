import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import * as orderService from "../../../services/orderService";
import auth from "../../../services/authService";
import { Link } from "react-router-dom";
class IndexOrder extends Component {
  state = {
    stores: {},
    orders: []
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });

    const storeObject = this.state.store;
    const { data: orders } = await orderService.getOrders(storeObject);
    this.setState({ orders });
    console.log(this.state.orders);
  }
  render() {
    if (this.state.orders.length === 0) return null;
    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Orders Detail</h6>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered table-responsive"
                width="100%"
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Edit Status</th>
                    <th>Date</th>
                    <th>Buyer First Name</th>
                    <th>Buyer Last Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Payment Type</th>
                    <th>total Price</th>

                    <th>View</th>
                  </tr>
                  {this.state.orders.map(order => {
                    return (
                      <React.Fragment>
                        <tr key={order._id}>
                          <td>{order.status}</td>
                          <td>
                            <Link
                              to={`/editOrderStatus/${order._id}`}
                              className="btn btn-info"
                            >
                              Edit Order
                            </Link>
                          </td>
                          <td>{order.date}</td>
                          <td>{order.fname}</td>
                          <td>{order.lname}</td>
                          <td>
                            {order.address} , {order.city} , {order.state} ,{" "}
                            {order.country}
                          </td>
                          <td>{order.phone}</td>
                          <td>{order.email}</td>
                          <td>{order.paymentType}</td>
                          <td>{order.formattedTotals}</td>

                          <td>
                            <Link
                              to={`/viewOrder/${order._id}`}
                              className="btn btn-success"
                            >
                              View Order
                            </Link>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
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

export default IndexOrder;
