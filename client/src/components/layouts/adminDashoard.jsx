import React from "react";
import Sidebar from "../adminpanel/Sidebar";
import Header from "../adminpanel/Header";

const AdminDashboard = props => {
  return (
    <React.Fragment>
      <div id="wrapper">
        <Sidebar />
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            <Header />

            {/* Begin Page Content */}
            <div className="container-fluid">{props.children}</div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
