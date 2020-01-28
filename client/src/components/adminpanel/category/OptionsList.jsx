import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as categoryService from "../../../services/categoryService";

class OptionList extends Component {
  state = {};
  handleDelete = async id => {
    try {
      await categoryService.deleteCategory(id);
      window.location = "/indexCategory";
    } catch (ex) {
      if (ex.response && ex.response.status === 403) {
        alert(ex.response.data);
      }
    }
  };
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        {data.map(m => {
          return (
            <ul key={m._id}>
              <li>
                {m.name}
                <Link to={`/createsubcategory/${m._id}`} className="pl-5">
                  Add Subcategory
                </Link>
                <Link to={`/editcategory/${m._id}`} className="pl-5">
                  Edit
                </Link>
                <button
                  className="btn btn-danger ml-5"
                  onClick={() => this.handleDelete(m._id)}
                >
                  Delete
                </button>

                {m.children && <OptionList data={m.children} />}
              </li>
            </ul>
          );
        })}
      </React.Fragment>
    );
  }
}

export default OptionList;
