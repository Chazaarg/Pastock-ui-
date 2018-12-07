import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import SubCategoriaModal from "../layout/SubCategoriaModal";

const Subcategorias = props => {
  const {
    closeNav,
    categoria,
    categorias,
    newProp,
    notify,
    deleteSubcategoria
  } = props;

  let { subcategorias } = props;

  subcategorias = subcategorias.filter(
    subcategoria => subcategoria.categoria === categoria.id
  );

  //Creo el botón para cerrar el sideNav.

  const btnClose = document.createElement("div");
  btnClose.classList.add("closebtn", "p-0", "float-right");
  btnClose.onclick = closeNav;
  btnClose.innerHTML = "&times;";

  //Recorro todos los Table Heads
  let tableHeads = Array.from(document.querySelectorAll("th"));
  tableHeads.forEach(tableHead => {
    //Si el Table Head corresponde a subcategorias, es decir, está en el side Nav...
    if (tableHead.textContent.includes("Subcategorias - ")) {
      //Le doy estilo.
      tableHead.style.fontSize = "1.4rem";

      //Elimino el botón si es que lo contiene.
      let tableHeadbtn = tableHead.children.item(1);
      if (tableHeadbtn) {
        tableHeadbtn.remove();
      }

      //Y le agrego el botón para cerrar el sideNav.
      tableHead.appendChild(btnClose);
    }
  });
  const nombreFormatter = (cell, row) => {
    return (
      <div className="row">
        <div
          style={{ fontSize: "1.3rem" }}
          className="col-2 text-danger"
          onClick={() => deleteSubcategoria(row.id)}
        >
          &times;
        </div>
        <div className="col-10 m-auto ">{cell}</div>
      </div>
    );
  };

  const columns = [
    {
      dataField: "nombre",
      text: categoria.nombre
        ? "Subcategorias - " + categoria.nombre + "  "
        : "Subcategorias - ",
      sort: true,
      formatter: nombreFormatter
    }
  ];

  let [optionsCategoria] = [
    categorias.map(categoria => ({
      nombre: "categoria",
      value: categoria.id,
      label: categoria.nombre
    }))
  ];

  return (
    <div id="sideNav" className="sidenav col-10 float-right p-0">
      <ToolkitProvider
        keyField="id"
        data={subcategorias}
        columns={columns}
        bootstrap4={true}
      >
        {props => <BootstrapTable {...props.baseProps} />}
      </ToolkitProvider>
      <SubCategoriaModal
        newProp={newProp}
        categoria={categoria}
        notify={notify}
        optionsCategoria={optionsCategoria}
        btnClass="text-secondary btn btn-link"
      />
    </div>
  );
};

export default Subcategorias;
