import React from "react";
import NavBar from "./../navBar";
import Footer from "../footer";
const MainLayout = props => {
  return (
    <div>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default MainLayout;
