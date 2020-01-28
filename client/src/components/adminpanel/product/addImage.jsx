import React, { Component, Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class AddProductImage extends Component {
  state = {
    selectedFile: null
  };

  onChangeHandler = event => {
    let files = event.target.files;
    console.log("onChangeHandler_files-->", this.state.selectedFile);

    // if return true allow to setState
    this.setState({
      selectedFile: files
    });
    console.log("selectedFile___setState()-->", this.state.selectedFile);
  };

  handleSubmit = async e => {
    e.preventDefault();
    // console.log(
    //   "isrr__selectedFile-->>",
    //   this.state.selectedFile,
    //   "Lenght--->",
    //   this.state.selectedFile.length
    // );
    const data = new FormData();
    for (let x = 0; x < this.state.selectedFile.length; x++) {
      data.append("file", this.state.selectedFile[x]);
      console.log("data.append-->", data);
    }
    console.log(
      "this.state.selectedFile-->>",
      this.state.selectedFile,
      "onSubmit_data-->",
      data
    );
    // data.append("test", { name: "awais" });
    // await axios
    //   .post("http://localhost:4000/uploadImage", data, {
    //     // onUploadProgress: ProgressEvent => {
    //     //   this.setState({
    //     //     loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
    //     //   });
    //     // }
    //   })
    //   .then(res => {
    //     // then print response status
    //     // const { fileName, filePath } = res.data;
    //     // console.log("res-->", res.data.filePath);
    //     console.log("res-->", res);
    //     toast.success("image upload successfully");
    //   })
    //   .catch(err => {
    //     // then print response status
    //     toast.error("image upload failed");
    //   });

    await axios
      .put(
        "http://localhost:4000/api/products/images/" +
          this.props.match.params.id,
        data
      )
      .then(res => {
        console.log("res-->", res);
        console.log("image upload successfully");
      })
      .catch(err => {
        // then print response status
        console.log("image upload failed");
      });
    this.props.history.push("/indexProduct");
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="offset-md-3 col-md-6">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group files">
                  <label>Upload Your File </label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <ToastContainer />
                </div>

                <button type="submit" className="btn btn-primary">
                  Upload
                  <i className="fas fa-upload" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddProductImage;
