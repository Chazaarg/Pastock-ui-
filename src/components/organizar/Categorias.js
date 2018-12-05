import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import Subcategorias from "./Subcategorias";

const Categorias = props => {
  const { categorias, toggleNav, openNav } = props;

  const subcategoriaFormatter = (cell, row) => {
    return (
      <div className="btn btn-warning" onClick={openNav}>
        {" "}
        Subcategorias
      </div>
    );
  };

  const columns = [
    {
      dataField: "nombre",
      text: "Nombre",
      sort: true
    },
    {
      dataField: "subcategoria",
      text: "",
      isDummyField: true,
      formatter: subcategoriaFormatter
    }
  ];
  return (
    <React.Fragment>
      <div className="col-6 float-left">
        <ToolkitProvider
          keyField="id"
          data={categorias}
          columns={columns}
          bootstrap4={true}
        >
          {props => <BootstrapTable {...props.baseProps} />}
        </ToolkitProvider>
      </div>
      <div
        className="col-6 float-right"
        id="sideNavContainer"
        style={{
          height: "40%"
        }}
      >
        {/* Subcategorias */}

        <Subcategorias toggleNav={toggleNav} />
      </div>
    </React.Fragment>
  );
};

export default Categorias;
