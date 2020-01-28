import React, { Component } from "react";
import { Link } from "react-router-dom";
class IndexPamentPlan extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Plan Detail</h6>
          </div>
          {/* {!about && (
            <div className="row">
              <div className="col-md-3 ml-2 mt-2">
                <Link to="createAbout" className="btn btn-primary">
                  Add About Information <i className="fas fa-plus-square" />
                </Link>
              </div>
            </div>
          )} */}
          <Link to="addPlan" className="btn btn-primary">
            Add Plan <i className="fas fa-plus-square" />
          </Link>

          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                width="100%"
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Info</th>
                    <th>More Info</th>

                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                  {/* {about && (
                    <tr>
                      <td>{about.description}</td>
                      <td>{about.info}</td>
                      <td>{about.moreInfo}</td>

                      <td>
                        <Link
                          to={`/editAbout/${about._id}`}
                          className="btn btn-info"
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(about)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )} */}
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

export default IndexPamentPlan;
