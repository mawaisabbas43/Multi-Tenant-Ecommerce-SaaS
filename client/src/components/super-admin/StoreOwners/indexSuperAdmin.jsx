import React, { Component } from "react";
import * as userService from "../../../services/userService";

class IndexSuperAdmin extends Component {
  state = {
    users: []
  };
  async componentDidMount() {
    const { data: users } = await userService.getUsers();
    this.setState({ users });
  }
  render() {
    if (this.state.users.length === 0) return null;
    return (
      <React.Fragment>
        <h1>List of Store Owners</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">User Detail</h6>
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
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                  {this.state.users.map(user => {
                    return (
                      <React.Fragment>
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
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

export default IndexSuperAdmin;
