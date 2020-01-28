import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import auth from "../../../services/authService";
import { Link } from "react-router-dom";
class IndexStoreImage extends Component {
  state = {
    store: {}
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0].image });
  }

  render() {
    const { store } = this.state;
    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Store Image Detail
            </h6>
          </div>
          <div className="row">
            <div className="col-md-3 ml-2 mt-2">
              {!store && (
                <Link to="addStoreImage" className="btn btn-primary">
                  Add Store Image <i className="fas fa-plus-square" />
                </Link>
              )}
            </div>
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
                    <th>Image</th>

                    <th>Edit</th>
                  </tr>
                  {store && (
                    <tr>
                      <td>
                        <img
                          src={`server/${store.url}`}
                          alt={store.caption}
                          width="250px"
                          height="250px"
                        />
                      </td>

                      <td>
                        <Link to="addStoreImage" className="btn btn-info">
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

export default IndexStoreImage;
