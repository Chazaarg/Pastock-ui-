import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Alert = props => {
  const { message, messageType, errors } = props;
  errors
    ? Object.keys(errors).map(
        (key, index) => {
          const input = document.getElementsByName(key)[0];
          input.classList.add(
            classnames({
              "is-invalid": errors[key].status === "error",
              "is-valid": errors[key] === false
            })
          );
          const small = document.createElement("small");
          small.classList.add("float-right", "text-danger");
          small.innerHTML = errors[key].message;

          input.parentElement.prepend(small);
        }

        /*
        const input = document.getElementsByName(errors.indexOf(error))[0];
        input.classList.add(
          classnames({
            "is-invalid": error.status === "error",
            "is-valid": error.status !== "error"
          })
        );
        const small = document.createElement("small");
        small.classList.add("float-right", "text-danger");
        small.innerHTML = error.message;

        input.parentElement.prepend(small);
        */
      )
    : null;

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

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default Alert;
