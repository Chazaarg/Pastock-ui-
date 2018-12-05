import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

const Subcategorias = props => {
  const { closeNav } = props;

  let { subcategorias } = props;

  subcategorias = subcategorias.filter(
    subcategoria => subcategoria.categoria === 3
  );

  const columns = [
    {
      dataField: "nombre",
      text: (
        <React.Fragment>
          <h6>Subcategorias</h6>
          <div className="closebtn p-0 float-right" onClick={closeNav}>
            &times;
          </div>
        </React.Fragment>
      ),
      sort: true,
      headerSortingClasses: "d-none"
    }
  ];

  return (
    <div
      id="sideNav"
      className="sidenav col-10 float-right p-0"
      style={{ borderLeft: "1px solid #dee2e6" }}
    >
      <ToolkitProvider
        keyField="id"
        data={subcategorias}
        columns={columns}
        bootstrap4={true}
      >
        {props => <BootstrapTable {...props.baseProps} />}
      </ToolkitProvider>
    </div>
  );
};

export default Subcategorias;
