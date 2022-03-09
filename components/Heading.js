import React from "react";
import PropTypes from "prop-types";
import * as Styles from "styles/Heading.module.css";

export default function Heading({ level = 2, children, className, type }) {
  const Tag = "kicker" === type ? "span" : level > 6 ? "h6" : `h${level}`;

  return (
    <Tag
      className={`${"kicker" === type ? Styles.kicker : Styles.heading} ${
        className || ""
      }`}>
      {children}
    </Tag>
  );
}

Heading.propTypes = {
  level: PropTypes.oneOf(["1", "2", "3", "4", "5", "6"]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  type: PropTypes.oneOf(["headline", "subtitle", "title", "kicker"]),
  className: PropTypes.string,
};
