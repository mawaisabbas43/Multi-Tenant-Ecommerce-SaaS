import React, { Component } from "react";
import * as orderService from "../../../services/orderService";
import DisplayItems from "./displayItems";
class ViewOrder extends Component {
  state = {
    order: {}
  };
  async componentDidMount() {
    const { data: order } = await orderService.getSingleOrder(
      this.props.match.params.id
    );

    this.setState({
      order
    });
  }
  render() {
    const { order } = this.state;
    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              View Order Detail
            </h6>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <h3 className="text-primary">Order Status</h3>
                    {order.status}
                  </div>
                  <div className="col-md-4">
                    <h3 className="text-primary">Order Date</h3>
                    {order.date}
                  </div>
                  <div className="col-md-4">
                    <h3 className="text-primary">FormattedTotals</h3>
                    {order.formattedTotals}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <h3 className="text-primary">Buyer First Name</h3>
                    {order.fname}
                  </div>
                  <div className="col-md-4">
                    <h3 className="text-primary">Buyer Last Name</h3>
                    {order.lname}
                  </div>
                  <div className="col-md-4">
                    <h3 className="text-primary">Address</h3>
                    {order.address}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <h3 className="text-primary">City</h3>
                    {order.city}
                  </div>
                  <div className="col-md-4">
                    <h3 className="text-primary">State</h3>
                    {order.state}
                  </div>
                  <div className="col-md-4">
                    <h3 className="text-primary">Zip Code</h3>
                    {order.zip}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <h3 className="text-primary">Country</h3>
                    {order.country}
                  </div>
                  <div className="col-md-4">
                    <h3 className="text-primary">Phone</h3>
                    {order.phone}
                  </div>
                  <div className="col-md-4">
                    <h3 className="text-primary">Email</h3>
                    {order.email}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <h3 className="text-primary">Payment Type</h3>
                    {order.paymentType}
                  </div>
                  <div className="col-md-4">
                    <h3 className="text-primary">Total Price</h3>
                    {order.totals}
                  </div>
                </div>
                <br />
                <br />
                <h1 className="text-success">Product Detail</h1>
                <br />
                <div className="table-responsive">
                  <table className="table table-bordered table-responsive">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Summary</th>
                        <th>Sku</th>
                        <th>Variant</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {order.items.map(item => {
                        return (
                          <React.Fragment>
                            <td>{item.variant}</td>
                          </React.Fragment>
                        );
                      })} */}
                      <DisplayItems data={order.items} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewOrder;
