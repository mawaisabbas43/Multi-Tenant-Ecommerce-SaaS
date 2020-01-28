import React, { Component } from "react";
import * as aboutService from "../../../services/aboutService";

class StoreAbout extends Component {
  state = {};
  async componentDidMount() {
    const { data: about } = await aboutService.getStoreAbout(
      this.props.match.params.id
    );
    this.setState({ about: about[0] });
    console.log(this.state.about);
  }
  render() {
    const { about } = this.state;
    return (
      <React.Fragment>
        <h1>Store About Us</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">About Detail</h6>
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
                    <th>Description</th>
                    <th>Info</th>
                    <th>More Info</th>
                  </tr>
                  {about && (
                    <tr>
                      <td>{about.description}</td>
                      <td>{about.info}</td>
                      <td>{about.moreInfo}</td>
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

export default StoreAbout;
