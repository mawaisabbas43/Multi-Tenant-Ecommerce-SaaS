import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import auth from "../../../services/authService";
import { Link } from "react-router-dom";
class IndexStore extends Component {
  state = {
    stores: [],
    user: {}
  };
  async componentDidMount() {
    const { data: stores } = await storeService.getStores();

    const user = await auth.getCurrentUser();
    this.setState({ stores, user });
  }
  render() {
    const userId = this.state.user._id;
    const store = this.state.stores.map(store => {
      if (userId === store.user)
        return (
          <tr key={store._id}>
            <td>{store.name}</td>
            <td>{store.description}</td>
            <td>{store.theme}</td>

            <td>
              <Link to={`/editStore/${store._id}`} className="btn btn-info">
                <i className="far fa-edit" />
                Edit
              </Link>
            </td>
          </tr>
        );
      return null;
    });
    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Store Detail</h6>
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
                    <th>Store Name</th>
                    <th>Store Description</th>
                    <th>Store Theme</th>

                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>{store}</tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IndexStore;
