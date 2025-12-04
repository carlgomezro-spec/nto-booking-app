import React from "react";
import Footer from "../Footer/Footer";

const Main = ({ children }) => {
  return <div className="layout-container">
      <main style={{ paddingBottom: "80px" }}>
        {children}
      </main>
      <Footer />
    </div>
};

export default Main;
