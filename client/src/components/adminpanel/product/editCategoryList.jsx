import React, { Component } from "react";

class EditCategoryList extends Component {
  render() {
    const { data, select, isGoing } = this.props;
    return (
      <React.Fragment>
        {data.map((m, i) => {
          return (
            <ul key={m._id}>
              <li>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="category"
                  checked={isGoing}
                  value={m._id}
                  onClick={e => select(e, m._id)}
                />

                {m.name}

                {m.children && (
                  <EditCategoryList
                    data={m.children}
                    select={select}
                    isGoing={isGoing}
                  />
                )}
              </li>
            </ul>
          );
        })}
      </React.Fragment>
    );
  }
}

export default EditCategoryList;
