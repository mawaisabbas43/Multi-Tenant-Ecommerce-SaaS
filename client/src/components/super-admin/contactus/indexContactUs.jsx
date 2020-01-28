import React, { Component } from "react";
import * as contactService from "../../../services/contactService";

class StoreContactUs extends Component {
  state = {
    contact: []
  };
  async componentDidMount() {
    const { data: contact } = await contactService.getStoreContact(
      this.props.match.params.id
    );
    this.setState({
      contact
    });
    console.log(this.state.contact);
  }
  render() {
    return (
      <React.Fragment>
        <h1>Store Contact Us</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Contact Detail
            </h6>
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
                    <th>Map Url</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.contact.map(con => {
                    return (
                      <tr key={con._id}>
                        <td>{con.description}</td>
                        <td>{con.mapUrl}</td>
                        <td>
                          {con.addresses.map((ad, i) => {
                            return (
                              <ul key={i}>
                                <li>{ad}</li>
                              </ul>
                            );
                          })}
                        </td>
                        <td>
                          {con.phones.map((ph, i) => {
                            return (
                              <ul key={i}>
                                <li>{ph}</li>
                              </ul>
                            );
                          })}
                        </td>
                        <td>
                          {con.emails.map((mp, i) => {
                            return (
                              <ul key={i}>
                                <li>{mp}</li>
                              </ul>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreContactUs;
