import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as storeService from "../../../services/storeService";
import * as contactService from "../../../services/contactService";
import auth from "../../../services/authService";
class Contact extends Component {
  state = {
    store: {},
    contact: []
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });
    const storeObject = this.state.store;
    const { data: contact } = await contactService.getContact(storeObject);
    this.setState({
      contact
    });
  }
  handleDelete = async id => {
    await contactService.deleteContact(id);
    window.location = "/Contact-Us";
  };
  render() {
    const { contact } = this.state;

    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Contact Detail
            </h6>
          </div>
          {contact && contact.length === 0 && (
            <div className="row">
              <div className="col-md-3 ml-2 mt-2">
                <Link to="createContact" className="btn btn-primary">
                  Add Contact Us Info <i className="fas fa-plus-square" />
                </Link>
              </div>
            </div>
          )}

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

                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {contact.map(con => {
                    return (
                      <tr key={con._id}>
                        <td>{con.description}</td>
                        <td>{con.map}</td>
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

                        <td>
                          <Link
                            to={`/editContact/${con._id}`}
                            className="btn btn-info"
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.handleDelete(con._id)}
                          >
                            Delete
                          </button>
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

export default Contact;
