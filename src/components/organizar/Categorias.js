import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import Subcategorias from "./Subcategorias";

const Categorias = props => {
  const {
    categorias,
    categoria,
    subcategorias,
    subcategoriasClick,
    closeNav,
    openNav
  } = props;

  const subcategoriaFormatter = (cell, row) => {
    return (
      <div
        className="btn btn-warning"
        onClick={e => {
          openNav(e);
          subcategoriasClick(row);
        }}
      >
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
      <div className="col-6 float-left pr-0">
        <ToolkitProvider
          keyField="id"
          data={categorias}
          columns={columns}
          bootstrap4={true}
        >
          {props => <BootstrapTable {...props.baseProps} />}
        </ToolkitProvider>
      </div>
      <div className="col-6 float-right pl-0" id="sideNavContainer">
        <div className="col p-0" style={{ height: "100%", display: "none" }}>
          {/* Subcategorias */}
          <div className="p-0 col-2 float-left" style={{ height: "100%" }} />
          <Subcategorias
            closeNav={closeNav}
            subcategorias={subcategorias}
            categorias={categorias}
            categoria={categoria}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Categorias;
