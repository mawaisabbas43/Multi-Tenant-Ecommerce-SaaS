import React, { Component } from "react";

class List extends Component {
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        {data.map((m, i) => {
          return (
            <ul key={m._id}>
              <li>
                {m.name}

                {m.children && <List data={m.children} />}
              </li>
            </ul>
          );
        })}
      </React.Fragment>
    );
  }
}

export default List;
