import React, { Component } from "react";
class DynamicInput extends Component {
  state = {
    contact: {
      countries: []
    }
  };
  addCountry = () => {
    const contact = { ...this.state.contact };
    contact.countries = [...contact.countries, ""];
    this.setState({
      contact
    });
  };
  handleChange = (e, index) => {
    const contact = { ...this.state.contact };
    contact.countries[index] = e.target.value;
    this.setState({
      contact
    });
  };
  handleRemove = (e, index) => {
    const contact = { ...this.state.contact };
    contact.countries.splice(index, 1);
    this.setState({
      contact
    });
  };
  handleSubmit = e => {
    const contact = { ...this.state.contact };
    console.log(contact.countries);
  };
  render() {
    return (
      <React.Fragment>
        <h1>The Form</h1>
        <label>Address</label>
        {this.state.contact.countries.map((country, index) => {
          return (
            <div key={index}>
              <input
                onChange={e => this.handleChange(e, index)}
                type="text"
                value={country}
              />
              <button onClick={e => this.handleRemove(e, index)}>Remove</button>
            </div>
          );
        })}
        <hr />
        <button onClick={e => this.addCountry(e)}>Add country</button>
        <hr />
        <button onClick={e => this.handleSubmit(e)}>Submit</button>
      </React.Fragment>
    );
  }
}

export default DynamicInput;
