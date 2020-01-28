import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import * as contactService from "../../../services/contactService";
import auth from "../../../services/authService";
class addContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        description: "",
        mapUrl: "",
        phones: "",
        emails: "",
        addresses: [{ name: "" }]
      },
      store: {}
    };
  }
  addClick() {
    this.setState(prevState => ({
      addresses: [...prevState.addresses, { name: "" }]
    }));
  }
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });
  }
  createUI = () => {
    return this.state.contact.addresses((el, i) => (
      <div key={i}>
        <input
          placeholder="Enter Name"
          name="name"
          value={el.name || ""}
          onChange={this.handleChanges.bind(this, i)}
        />
        <input
          type="button"
          value="remove"
          onClick={this.removeClick.bind(this, i)}
        />
      </div>
    ));
  };
  handleChanges(i, e) {
    const { name, value } = e.target;
    let addresses = [...this.state.addresses];
    addresses[i] = { ...addresses[i], [name]: value };
    this.setState({ addresses });
  }
  handleChange = e => {
    const contact = { ...this.state.contact };
    contact[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      contact
    });
  };
  removeClick(i) {
    let addresses = [...this.state.addresses];
    addresses.splice(i, 1);
    this.setState({ addresses });
  }
  handleSubmit = async e => {
    e.preventDefault();

    const store = this.state.store;
    const contact = this.state.contact;
    console.log(store);
    console.log(contact);

    await contactService.CreateContact(contact, store);
    this.props.history.push("/Contact-Us");
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

              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  Address:
                </label>
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="addresses"
                  placeholder="Enter parent Category name"
                  onChange={this.handleChange}
                  value={this.state.contact.addresses}
                ></textarea>
              </div>
              {this.createUI()}
              <input
                type="button"
                value="add more"
                onClick={this.addClick.bind(this)}
              />
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  Phone No:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="phones"
                  placeholder="Enter Infor for About Us"
                  onChange={this.handleChange}
                  value={this.state.contact.phones}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-dark">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="emails"
                  placeholder="Enter Infor for About Us"
                  onChange={this.handleChange}
                  value={this.state.contact.emails}
                />
              </div>
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

export default addContact;
