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
    onChange,
    newProp
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
                className="form-control productoDefault"
                value={nombre}
                onChange={onChange}
              />
            </div>
            <div className="form-group col-md-4">
              <select
                name="marca"
                value={marca.id ? marca.id : marca}
                className="form-control productoDefault"
                onChange={onChange}
              >
                <option>Elige una marca...</option>
                {marcas.map(marca => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
              <MarcaModal newProp={newProp.bind(this)} />
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
                value={categoria.id ? categoria.id : categoria}
                className="form-control productoDefault"
                onChange={onChange}
              >
                <option>Elige una categoría...</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <CategoriaModal newProp={newProp.bind(this)} />
            </div>
            <div className="form-group col-md-4">
              <select
                name="sub_categoria"
                value={sub_categoria.id ? sub_categoria.id : sub_categoria}
                className="form-control productoDefault"
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
              <SubCategoriaModal newProp={newProp.bind(this)} />
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
              className="form-control productoDefault"
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
