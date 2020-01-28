import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import * as contactService from "../../../services/contactService";
import auth from "../../../services/authService";
import _ from "lodash";
class DynamicInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [{ name: "" }],
      phones: [{ number: "" }],
      emails: [{ email: "" }],
      contact: {
        description: "",
        mapUrl: ""
      },
      store: {}
    };
  }
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });
  }
  addAddressClick() {
    this.setState(prevState => ({
      addresses: [...prevState.addresses, { name: "" }]
    }));
  }
  addPhoneClick() {
    this.setState(prevState => ({
      phones: [...prevState.phones, { number: "" }]
    }));
  }
  addEmailClick() {
    this.setState(prevState => ({
      emails: [...prevState.emails, { email: "" }]
    }));
  }

  createadsrressUI() {
    return this.state.addresses.map((el, i) => (
      <div key={i}>
        <input
          type="text"
          placeholder=" Name"
          name="name"
          value={el.name || ""}
          onChange={this.handleAddressChange.bind(this, i)}
        />

        <input
          type="button"
          value="remove"
          className="btn btn-danger btn-sm mt-2"
          onClick={this.removeAddressClick.bind(this, i)}
        />
      </div>
    ));
  }
  createPhoneUI() {
    return this.state.phones.map((el, i) => (
      <div key={i}>
        <input
          type="text"
          placeholder="Enter Phone"
          name="number"
          value={el.number || ""}
          onChange={this.handlePhoneChange.bind(this, i)}
        />

        <input
          type="button"
          value="remove"
          className="btn btn-danger btn-sm mt-2"
          onClick={this.removePhoneClick.bind(this, i)}
        />
      </div>
    ));
  }
  createEmailUI() {
    return this.state.emails.map((el, i) => (
      <div key={i}>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={el.email || ""}
          onChange={this.handleEmailChange.bind(this, i)}
        />

        <input
          type="button"
          value="remove"
          className="btn btn-danger btn-sm mt-2"
          onClick={this.removeEmailClick.bind(this, i)}
        />
      </div>
    ));
  }
  handleChange = e => {
    const contact = { ...this.state.contact };
    contact[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      contact
    });
  };
  handleAddressChange(i, e) {
    const { name, value } = e.target;
    let addresses = [...this.state.addresses];
    addresses[i] = { ...addresses[i], [name]: value };
    this.setState({ addresses });
  }
  handlePhoneChange(i, e) {
    const { name, value } = e.target;
    let phones = [...this.state.phones];
    phones[i] = { ...phones[i], [name]: value };
    this.setState({ phones });
  }
  handleEmailChange(i, e) {
    const { name, value } = e.target;
    let emails = [...this.state.emails];
    emails[i] = { ...emails[i], [name]: value };
    this.setState({ emails });
  }

  removeAddressClick(i) {
    let addresses = [...this.state.addresses];
    addresses.splice(i, 1);
    this.setState({ addresses });
  }
  removePhoneClick(i) {
    let phones = [...this.state.phones];
    phones.splice(i, 1);
    this.setState({ phones });
  }
  removeEmailClick(i) {
    let emails = [...this.state.emails];
    emails.splice(i, 1);
    this.setState({ emails });
  }

  handleSubmit = async e => {
    // alert("A name was submitted: " + JSON.stringify(this.state.addresses));
    // event.preventDefault();
    e.preventDefault();

    const store = this.state.store;
    const contact = this.state.contact;
    const address = this.state.addresses;
    const phones = this.state.phones;
    const emails = this.state.emails;
    try {
      await contactService.CreateContact(
        contact,
        _.map(address, "name"),
        _.map(phones, "number"),
        _.map(emails, "email"),
        store
      );
      this.props.history.push("/Contact-Us");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        alert(ex.response.data);
      }
    }
  };
  render() {
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
                  value={this.state.description}
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
                  value={this.state.mapUrl}
                />
              </div>
              <label htmlFor="">Addresses:</label>
              {this.createadsrressUI()}
              <input
                type="button"
                value="add more"
                className="btn btn-primary mt-2 btn-sm"
                onClick={this.addAddressClick.bind(this)}
              />
              <br />
              <label htmlFor="">Phones</label>
              {this.createPhoneUI()}
              <input
                type="button"
                value="add more"
                className="btn btn-primary mt-2 btn-sm"
                onClick={this.addPhoneClick.bind(this)}
              />
              <br />
              <label htmlFor="">Email:</label>
              {this.createEmailUI()}
              <input
                type="button"
                value="add more"
                className="btn btn-primary mt-2 btn-sm"
                onClick={this.addEmailClick.bind(this)}
              />

              <br />
              <br />
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DynamicInput;
