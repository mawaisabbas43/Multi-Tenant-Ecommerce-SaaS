import React, { Component } from "react";
import { Link } from "react-router-dom";
class StoreDetailLink extends Component {
  state = {
    id: ""
  };
  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Store Links</h1>
        <div className="row">
          <div className="col-md-3">
            <Link
              to={`/storeCategory/${this.state.id}`}
              className="btn btn-primary"
            >
              Category <i className="fas fa-eye pl-2" />
            </Link>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-3">
            <Link
              to={`/storeProduct/${this.state.id}`}
              className="btn btn-primary"
            >
              Product <i className="fas fa-eye pl-2" />
            </Link>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-3">
            <Link
              to={`/storeAbout/${this.state.id}`}
              className="btn btn-primary"
            >
              About Us
              <i className="fas fa-eye pl-2" />
            </Link>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-3">
            <Link
              to={`/storeContactUs/${this.state.id}`}
              className="btn btn-primary"
            >
              Contact Us
              <i className="fas fa-eye pl-2" />
            </Link>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-3">
            <Link
              to={`/storeFeedBack/${this.state.id}`}
              className="btn btn-primary"
            >
              FeedBack
              <i className="fas fa-eye pl-2" />
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreDetailLink;
