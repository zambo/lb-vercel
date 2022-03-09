import React from "react";
import PropTypes from "prop-types";
import * as Styles from "/styles/Section.module.css";

export default function Section({
  background,
  children,
  className,
  fullWidth,
  id,
  WrapperTag = "section",
}) {
  const sectionId = id ? id.replace("#", "") : undefined;

  return (
    <WrapperTag
      className={Styles.wrapper}
      id={sectionId}
      name={sectionId}
      data-full-width={fullWidth}
      data-background={background}>
      <div className={className}>{children}</div>
    </WrapperTag>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.oneOf(["light", "dark", "blue"]),
};
