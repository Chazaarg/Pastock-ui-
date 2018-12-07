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
    openNav,
    deleteSubcategoria,
    deleteCategoria,
    notifyUser,
    newProp,
    notify
  } = props;

  const nombreFormatter = (cell, row) => {
    return (
      <div className="row">
        <div
          style={{ fontSize: "1.3rem" }}
          className="col-1 text-danger"
          onClick={() =>
            deleteCategoria(row.id).then(
              notifyUser(`Categoria ${cell} eliminada.`, "warning", null)
            )
          }
        >
          &times;
        </div>
        <div className="col-8 m-auto " style={{ wordWrap: "break-word" }}>
          {cell}
        </div>
        <div className="float-right col-3">
          <span
            style={{
              width: "6rem",
              height: "2rem",
              fontSize: "0.6rem",
              textAlign: "center",
              fontWeight: "bold"
            }}
            className="btn btn-warning m-auto"
            onClick={e => {
              openNav(e);
              subcategoriasClick(row);
            }}
          >
            SUBCATEGORIAS
          </span>
        </div>
      </div>
    );
  };

  const columns = [
    {
      dataField: "nombre",
      text: "Nombre",
      sort: true,
      formatter: nombreFormatter,
      headerAlign: (column, colIndex) => "center"
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
            deleteSubcategoria={deleteSubcategoria}
            notifyUser={notifyUser}
            newProp={newProp}
            notify={notify}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Categorias;
