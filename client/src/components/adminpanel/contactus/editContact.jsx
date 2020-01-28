import React, { Component } from "react";
import * as contactService from "../../../services/contactService";

class EditContact extends Component {
  state = {
    contact: []
  };
  async componentDidMount() {
    const { data: contact } = await contactService.getSingleContact(
      this.props.match.params.id
    );

    this.setState({
      contact
    });
  }
  handleChangeAddress = (e, i) => {
    const value = e.target.value;
    const index = i;
    const { contact } = this.state;
    contact.addresses[index] = value;
    this.setState({ contact });
  };
  handleChangePhone = (e, i) => {
    const value = e.target.value;
    const index = i;
    const { contact } = this.state;
    contact.phones[index] = value;
    this.setState({ contact });
  };
  handleChangeEmail = (e, i) => {
    const value = e.target.value;
    const index = i;
    const { contact } = this.state;
    contact.emails[index] = value;
    this.setState({ contact });
  };
  handleChange = e => {
    const contact = { ...this.state.contact };
    contact[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      contact
    });
  };

  handleSubmit = async e => {
    const contact = { ...this.state.contact };
    e.preventDefault();

    await contactService.updatecontact(this.props.match.params.id, contact);
    this.props.history.push("/Contact-Us");
  };
  render() {
    if (this.state.contact.length < 1) return null;
    return (
      <React.Fragment>
        <div className="container">
          <div className="col-md-12">
            <h1>Create Contact Info</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  Decription:
                </label>
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="description"
                  placeholder="Enter Description"
                  onChange={this.handleChange}
                  value={this.state.contact.description}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  mapUrl:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="mapUrl"
                  placeholder="Enter Infor for About Us"
                  onChange={this.handleChange}
                  value={this.state.contact.mapUrl}
                />
              </div>

              {this.state.contact.addresses.map((ad, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="text-dark">
                        Address:
                      </label>
                      <input
                        type="text"
                        rows="3"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name={"name" + i}
                        placeholder="Enter Infor for About Us"
                        onChange={e => this.handleChangeAddress(e, i)}
                        value={this.state.contact.addresses[i]}
                      />
                    </div>
                    <br />
                  </React.Fragment>
                );
              })}
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  phones:
                </label>
                {this.state.contact.phones.map((ph, i) => {
                  return (
                    <React.Fragment>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="phones"
                        placeholder="Enter Infor for About Us"
                        onChange={e => this.handleChangePhone(e, i)}
                        value={this.state.contact.phones[i]}
                      />
                      <br />
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  emails:
                </label>
                {this.state.contact.emails.map((em, i) => {
                  return (
                    <React.Fragment>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="emails"
                        placeholder="Enter Infor for About Us"
                        onChange={e => this.handleChangeEmail(e, i)}
                        value={this.state.contact.emails[i]}
                      />
                      <br />
                    </React.Fragment>
                  );
                })}
              </div>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditContact;
