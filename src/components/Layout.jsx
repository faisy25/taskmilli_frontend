// src/components/Layout.jsx
import React from "react";
import Header from "./Header"; // Assuming you already have a Header component
import Footer from "./Footer"; // Assuming you already have a Footer component

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
