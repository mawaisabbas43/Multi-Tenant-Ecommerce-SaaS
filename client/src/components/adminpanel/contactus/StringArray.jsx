import React, { Component } from "react";

class StringArray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: ["hello", "world", "blah blah"]
    };
  }

  render() {
    const noteItems = this.state.notes.map(note => <li>{note}</li>);
    return (
      <React.Fragment>
        <ul>{noteItems}</ul>
      </React.Fragment>
    );
  }
}

export default StringArray;
