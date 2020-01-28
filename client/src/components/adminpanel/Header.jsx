import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";

class Header extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    if (user === undefined) return null;
    return (
      <React.Fragment>
        {/* Topbar */}

        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* Sidebar Toggle (Topbar) */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars" />
          </button>
          {/* Topbar Search */}
          {!user.isAdmin ? (
            <React.Fragment>
              <h2 className="pl-5" style={{ color: "#4E73DF" }}>
                Welcome to your Store Dashboard
              </h2>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2 className="pl-5" style={{ color: "#4E73DF" }}>
                Welcome to your Dashboard
              </h2>
            </React.Fragment>
          )}
          {/* <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm" />
                </button>
              </div>
            </div>
          </form> */}
          {/* Topbar Navbar */}
          <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block" />
            {/* Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow">
              {!user && (
                <React.Fragment>
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      rehan
                    </span>
                  </Link>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      {user.name}
                    </span>
                  </Link>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <Link className="dropdown-item" to="/logout">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Logout
                    </Link>
                  </div>
                </React.Fragment>
              )}
            </li>
          </ul>
        </nav>
        {/* End of Topbar */}
      </React.Fragment>
    );
  }
}

export default Header;
