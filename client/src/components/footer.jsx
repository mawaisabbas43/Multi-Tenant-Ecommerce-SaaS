import React, { Component } from "react";
import { Link } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <div className="container-fluid mt-5 p-0">
        <section className="idfooter" id="footer">
          <div className="container">
            <div className="row text-center text-xs-center text-sm-left text-md-left">
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Quick links</h5>
                <ul className="list-unstyled quick-links">
                  <li>
                    <i className="fa fa-angle-double-right" />
                    <Link to="/">Home</Link>
                  </li>
                  {/* <li>
                    <i className="fa fa-angle-double-right" />
                    <Link to="/onlinestore">Build Store</Link>
                  </li> */}
                  <li>
                    <i className="fa fa-angle-double-right" />
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <i className="fa fa-angle-double-right" />
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                {/* <h5>FolLow Us</h5> */}
                {/* <ul className="list-unstyled quick-links">
                  <li>
                    <Link to="#">
                      <i className="fab fa-facebook"></i>
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fab fa-twitter" />
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fab fa-instagram" />
                      Instagram
                    </Link>
                  </li>
                </ul> */}
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Contact Us</h5>
                <ul className="list-unstyled quick-links">
                  <li>
                    <h6>Email Us:</h6>
                    <Link to="#">
                      <i className="far fa-envelope" />
                      mawaisabbas43@gmail.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Footer;
