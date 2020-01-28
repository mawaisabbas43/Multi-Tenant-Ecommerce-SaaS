import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import { Link } from "react-router-dom";
class StoreList extends Component {
  state = {
    stores: []
  };
  async componentDidMount() {
    const { data: stores } = await storeService.getStores();

    this.setState({ stores });
    console.log(this.state.stores);
  }
  render() {
    const { stores } = this.state;
    return (
      <React.Fragment>
        <h1>List of Stores</h1>
        <div className="row">
          {stores &&
            stores.map(store => {
              return (
                <React.Fragment>
                  <div className="col-md-4">
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        className="card-img-top"
                        src={store.logo && `server${store.logo.url}`}
                        alt={store.caption}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{store.name}</h5>
                        <p className="card-text">{store.description}</p>
                        <Link
                          to={`/storeLinks/${store._id}`}
                          className="btn btn-primary"
                        >
                          View Data
                          <i className="fas fa-eye pl-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}

export default StoreList;
