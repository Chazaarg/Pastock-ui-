import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const ProductoAlert = props => {
  const { message, messageType, errors } = props;

  //Agarro los inputs de productoDefault.
  let defaultInputs = document.getElementsByClassName("productoDefault");
  defaultInputs = Array.from(defaultInputs);
  //Agarro los inputs de ProductoIndividual.
  let indInputs = document.getElementsByClassName("indInputs");
  indInputs = Array.from(indInputs);
  //Agarro los inputs de ProductoVariantes.
  let varInputs = document.getElementsByClassName("varInputs");
  varInputs = Array.from(varInputs);
  //Si recibo un array con los errores específicos para cada input...
  if (errors["productoError"] || errors["varianteError"]) {
    //Para cualquier tipo de producto verifico errores en los defaultInputs.
    if (errors.productoError.length > 0) {
      defaultInputs.forEach(input => {
        //Me aseguro de eliminar errores anteriores.
        if (input.classList.contains("is-invalid")) {
          input.classList.remove("is-invalid");
        }
        errors.productoError.forEach(error => {
          if (error.value === input.name) {
            input.classList.add("is-invalid");
          }
        });
      });
    }
    //Si el producto tiene errores en las variantes.
    const cantDeVariantes = errors.varianteError.length;
    if (cantDeVariantes > 0) {
      //Antes que nada, me aseguro de eliminar errores anteriores.
      varInputs.forEach(input => {
        if (input.classList.contains("is-invalid")) {
          input.classList.remove("is-invalid");
        }
      });

      //Variable para recorrer inputs de 4 en 4.
      let doblePar = 0;
      //Por cada variante
      errors.varianteError.forEach((variante, varIdx) => {
        for (let i = 1; i < varInputs.length; i++) {
          //Tengo que agarrar inputs de 4 en 4.
          if (i > doblePar && i < doblePar + 4) {
            variante.forEach(error => {
              if (varInputs[i].name === error.value) {
                varInputs[i].classList.add("is-invalid");
              }
              if (error.value === "varianteTipo") {
                varInputs[0].classList.add("is-invalid");
              }
            });
          }
        }
        doblePar += 4;
      });

      /*
        for (let i = 1; i < cantDeVariantes * 5; i += 4) {
          varInputs.forEach((input, idx) => {
            if (idx >= i && idx <= i + 4) {
              if (idx <= varIdx + 4 && idx >= varIdx - 4) {
                variante.forEach(error => {
                  
                });
              }
            }
          });
        }
        */

      /*
      errors.varianteError.forEach(variante => {
        for (let i = 0; i < cantDeVariantes * 5 - 1; i++) {
          variante.forEach(error => {
            if (error.value === varInputs[i].name) {
              varInputs[i].classList.add("is-invalid");
            }
          });
        }
      });*/
    }
    //Si el producto no tiene variantes:
    else {
      indInputs.forEach(input => {
        errors.productoError.forEach(error => {
          if (error.value === input.name) {
            input.classList.add("is-invalid");
          }
        });
      });
    }
  }
  return (
    <div
      className={classnames("alert", {
        "alert-success": messageType === "success",
        "alert-danger": messageType === "error"
      })}
    >
      {message}
    </div>
  );
};

ProductoAlert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default ProductoAlert;
