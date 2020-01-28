import React, { Component } from "react";
import * as orderService from "../../../services/orderService";

class EditOrderStatus extends Component {
  state = {
    order: {
      status: ""
    }
  };
  async componentDidMount() {
    const { data: order } = await orderService.getSingleOrder(
      this.props.match.params.id
    );
    this.setState({ order });
  }
  handleChange = e => {
    const order = { ...this.state.order };
    order[e.target.name] = e.target.value;
    this.setState({
      order
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const order = { ...this.state.order };

    await orderService.updateOrderStatus(this.props.match.params.id, order);
    this.props.history.push("/indexOrder");
  };
  render() {
    return (
      <React.Fragment>
        <h1>Edit Order Status</h1>
        <div className="container">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  status:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="status"
                  onChange={this.handleChange}
                  value={this.state.order.status}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditOrderStatus;
