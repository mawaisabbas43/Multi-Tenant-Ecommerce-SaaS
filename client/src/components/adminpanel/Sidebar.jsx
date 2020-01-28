import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
import * as storeService from "../../services/storeService";

class Sidebar extends Component {
  state = {
    storeId: ""
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();

    if (!user.isAdmin) {
      const { data: store } = await storeService.getUserStore(user);

      this.setState({ user, storeId: store[0]._id });
    } else {
      this.setState({ user });
    }
  }
  rediReact = () => {
    window.open("http://localhost:4000/" + this.state.storeId, "_blank");
  };
  render() {
    const { user } = this.state;
    if (user === undefined) return null;

    return (
      <React.Fragment>
        {/* Sidebar */}

        {/* Sidebar - Brand */}

        {!user.isAdmin ? (
          <React.Fragment>
            <ul
              className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
              id="accordionSidebar"
            >
              <Link
                className="sidebar-brand d-flex align-items-center justify-content-center"
                to="/indexCategory"
              >
                <div className="sidebar-brand-icon rotate-n-15">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Store House</div>
              </Link>
              {/* Divider */}
              <hr className="sidebar-divider my-0" />
              {/* Nav Item - Dashboard */}
              <li className="nav-item">
                <Link className="nav-link" to="/indexStore">
                  <i className="fas fa-fw fa-tachometer-alt" />
                  <span>Store Dashboard</span>
                </Link>
              </li>
              {/* Divider */}
              <hr className="sidebar-divider" />
              <li className="nav-item">
                <Link
                  className="nav-link collapsed"
                  to="#"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  <i className="fas fa-shopping-cart" />

                  <span>Store</span>
                </Link>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <Link className="collapse-item" to="/indexStore">
                      View Store Detail
                    </Link>
                    <a className="collapse-item" onClick={this.rediReact}>
                      View Your Store
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="Logo">
                  <i className="fa fa-file-image" />
                  <span>Logo</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link collapsed" to="StoreImage">
                  <i className="fa fa-file-image" />
                  <span>Store Image</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link collapsed"
                  to="#"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i className="fa fa-list-alt" aria-hidden="true"></i>
                  <span>Category</span>
                </Link>
                <div
                  id="collapseOne"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <Link className="collapse-item" to="/indexCategory">
                      View Categories
                    </Link>
                    <Link className="collapse-item" to="/parentCategory">
                      Add Parent Category
                    </Link>
                  </div>
                </div>
              </li>

              {/* Nav Item - Utilities Collapse Menu */}
              <li className="nav-item">
                <Link className="nav-link" to="/indexProduct">
                  <i className="fab fa-product-hunt" />

                  <span>Product</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/indexOrder">
                  <span>Order</span>
                </Link>
              </li>
              {/* Divider */}
              <hr className="sidebar-divider" />

              <li className="nav-item">
                <Link className="nav-link" to="/About-Us">
                  <i className="fas fa-address-card" />

                  <span>About Us</span>
                </Link>
              </li>
              {/* Nav Item - Charts */}
              <li className="nav-item">
                <Link className="nav-link" to="/Contact-Us">
                  <i className="fas fa-address-book" />

                  <span>Contact Us</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Feedback">
                  <i className="fas fa-comments"></i>

                  <span>FeedBack</span>
                </Link>
              </li>
              {/* Divider */}
              <hr className="sidebar-divider d-none d-md-block" />

              <li className="nav-item">
                <Link
                  className="nav-link collapsed"
                  to="#"
                  data-toggle="collapse"
                  data-target="#collapseAccount"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i className="fas fa-money-check-alt" />

                  <span>Payment Methods</span>
                </Link>
                <div
                  id="collapseAccount"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <Link className="collapse-item" to="/indexPaypal">
                      <i className="fab fa-paypal" />
                      <span className="pl-1"> Paypal</span>
                    </Link>
                    <Link className="collapse-item" to="/indexStripe">
                      <i className="fab fa-stripe-s" />

                      <span className="pl-1"> Stripe</span>
                    </Link>
                    {/* <Link className="collapse-item" to="/parentCategory">
                      <i className="fas fa-money-bill-alt" />
                      <span className="pl-1"> Cash On Delivery</span>
                    </Link> */}
                  </div>
                </div>
              </li>
              {/* Sidebar Toggler (Sidebar) */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/indexPlan">
                  <i className="fas fa-money-check-alt" />
                  <span>Payment Plan</span>
                </Link>
              </li> */}
            </ul>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* SuperAdmin Links  */}
            <ul
              className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
              id="accordionSidebar"
            >
              <Link
                className="sidebar-brand d-flex align-items-center justify-content-center"
                to="/indexCategory"
              >
                <div className="sidebar-brand-icon rotate-n-15">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Our Admin Panel</div>
              </Link>
              {/* Divider */}

              {/* Divider */}
              <hr className="sidebar-divider" />
              <li className="nav-item">
                <Link className="nav-link" to="/indexSuperAdmin">
                  <i className="fas fa-user" />

                  <span>Store Owners/Users</span>
                </Link>
              </li>
              <hr className="sidebar-divider" />
              <li className="nav-item">
                <Link className="nav-link" to="/ListStores">
                  <i className="fas fa-user" />

                  <span>List of Stores</span>
                </Link>
              </li>
            </ul>
          </React.Fragment>
        )}

        {/* End of Sidebar */}
      </React.Fragment>
    );
  }
}

export default Sidebar;
