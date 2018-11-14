import React from "react";
import MarcaModal from "../layout/MarcaModal";
import CategoriaModal from "../layout/CategoriaModal";
import SubCategoriaModal from "../layout/SubCategoriaModal";

const ProductoDefault = props => {
  const {
    nombre,
    marca,
    categoria,
    sub_categoria,
    descripcion,
    categorias,
    marcas,
    subcategorias,
    onChange
  } = props;
  return (
    <React.Fragment>
      <div className="card border-light mt-5">
        <div className="card-header">Nombre y Marca</div>
        <div className="card-body">
          <div className="form-row d-flex justify-content-between">
            <div className="form-group col-md-8">
              <input
                type="text"
                placeholder="Nombre..."
                name="nombre"
                className="form-control"
                value={nombre}
                onChange={onChange}
              />
            </div>
            <div className="form-group col-md-4">
              <select
                name="marca"
                value={marca ? marca.id : 0}
                className="form-control"
                onChange={onChange}
              >
                <option>Elige una marca...</option>
                {marcas.map(marca => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
              <MarcaModal />
            </div>
          </div>
        </div>
      </div>
      <div className="card border-light mt-5">
        <div className="card-header">Categoria</div>
        <div className="card-body">
          <div className="form-row d-flex justify-content-between mt-3">
            <div className="form-group col-md-6">
              <select
                name="categoria"
                value={categoria ? categoria.id : 0}
                className="form-control"
                onChange={onChange}
              >
                <option>Elige una categoría...</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <CategoriaModal />
            </div>
            <div className="form-group col-md-4">
              <select
                name="sub_categoria"
                value={sub_categoria ? sub_categoria.id : 0}
                className="form-control"
                onChange={onChange}
              >
                <option>Elige una sub categoría...</option>
                {categoria
                  ? categoria.id
                    ? subcategorias
                        .filter(
                          subcategoria =>
                            subcategoria.categoria === parseInt(categoria.id, 0)
                        )
                        .map(subcategoria => (
                          <option key={subcategoria.id} value={subcategoria.id}>
                            {subcategoria.nombre}
                          </option>
                        ))
                    : categoria !== ""
                    ? subcategorias
                        .filter(
                          subcategoria =>
                            subcategoria.categoria === parseInt(categoria, 0)
                        )
                        .map(subcategoria => (
                          <option key={subcategoria.id} value={subcategoria.id}>
                            {subcategoria.nombre}
                          </option>
                        ))
                    : null
                  : null}
                }
              </select>
              <SubCategoriaModal />
            </div>
          </div>
        </div>
      </div>

      <div className="card border-light mt-5">
        <div className="card-header">
          <label htmlFor="descripcion">Descripción</label>
        </div>
        <div className="card-body">
          <div className="form-group">
            <textarea
              className="form-control"
              name="descripcion"
              rows="3"
              value={descripcion ? descripcion : ""}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductoDefault;