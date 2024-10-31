import React from "react";
import { Link as RouterLink } from "react-router-dom";
// import { useAuth } from "../contextApi/AuthContext";

const Header = () => {
  // const data = useAuth();
  // console.log(data);

  return (
    <nav className="w-100% bg-dark p-3">
      <div className="container mx-auto px-4 flex justify-between">
        <h1 className="text-xl text-light"> Name </h1>

        <RouterLink to="/">
          <h1 className="text-xl text-light"> Signout </h1>
        </RouterLink>
      </div>
    </nav>
  );
};

export default Header;
