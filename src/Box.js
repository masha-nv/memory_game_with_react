import React from "react";
import "./Box.css";
import PropTypes from "prop-types";

const Box = (props) => {
  let style = {};
  if (props.showing) style.backgroundColor = props.card.backgroundColor;

  return <div className="box" onClick={props.onClick} style={style} />;
};

Box.propTypes = {
  onClick: PropTypes.func.isRequired,
  showing: PropTypes.bool.isRequired,
  card: PropTypes.object.isRequired,
};

export default Box;
