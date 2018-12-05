import React from "react";

const Subcategorias = props => {
  const { toggleNav } = props;

  return (
    <div id="sideNav" className="sidenav">
      <div className="closebtn" onClick={toggleNav}>
        &times;
      </div>
    </div>
  );
};

export default Subcategorias;
