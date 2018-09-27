import React from "react";
import Productos from "../productos/Productos";
import Nuevo from "./Nuevo";

export default () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-10">
          <Productos />
        </div>
        <div className="col-md-2">
          <Nuevo />
        </div>
      </div>
    </div>
  );
};
