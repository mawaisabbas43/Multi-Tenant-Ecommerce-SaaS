import React, { Component } from "react";
import * as feedbackService from "../../../services/feedbackService";

class StoreFeedBack extends Component {
  state = {
    feedback: []
  };
  async componentDidMount() {
    const { data: feedback } = await feedbackService.getStoreFeedback(
      this.props.match.params.id
    );
    this.setState({ feedback });
    console.log(this.state.feedback);
  }
  render() {
    return (
      <React.Fragment>
        <h1>Store FeedBack</h1>
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
                  </tr>
                  {this.state.feedback.map(feedback => {
                    return (
                      <React.Fragment>
                        <tr>
                          <td>{feedback.name}</td>
                          <td>{feedback.email}</td>
                          <td>{feedback.subject}</td>
                          <td>{feedback.message}</td>
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

export default StoreFeedBack;
