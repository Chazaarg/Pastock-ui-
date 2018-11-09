import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Alert = props => {
  const { message, messageType, values } = props;

  values
    ? values.forEach(value => {
        const input = document.getElementsByName(value)[0];
        input.classList.add(
          classnames({
            "is-invalid": messageType === "error",
            "is-valid": messageType === "success"
          })
        );
      })
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
