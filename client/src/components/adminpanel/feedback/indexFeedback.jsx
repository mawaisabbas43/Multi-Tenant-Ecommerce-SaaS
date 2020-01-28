import React, { Component } from "react";
import * as storeService from "../../../services/storeService";
import * as feedbackService from "../../../services/feedbackService";
import auth from "../../../services/authService";
class IndexFeedback extends Component {
  state = {
    stores: {},
    feedback: []
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);

    this.setState({ store: store[0] });

    const storeObject = this.state.store;
    const { data: feedback } = await feedbackService.getFeedback(storeObject);
    this.setState({ feedback });
    console.log(this.state.feedback);
  }
  handleDelete = async feedback => {
    await feedbackService.deleteFeedBack(feedback._id);
    window.location = "/Feedback";
  };
  render() {
    const { feedback } = this.state;
    if (feedback.length === 0) return null;
    return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              FeedBack Detail
            </h6>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                width="100%"
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>

                    <th>Message</th>
                    <th>Delete</th>
                  </tr>
                  {feedback.map(feedback => {
                    return (
                      <React.Fragment>
                        <tr>
                          <td>{feedback.name}</td>
                          <td>{feedback.email}</td>
                          <td>{feedback.subject}</td>
                          <td>{feedback.message}</td>

                          <td>
                            <button
                              onClick={() => this.handleDelete(feedback)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IndexFeedback;
