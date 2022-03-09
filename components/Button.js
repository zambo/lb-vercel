import { Link, Icon } from "components";
import PropTypes from "prop-types";
import React from "react";
import * as Styles from "styles/Button.module.css";

export default function Button({
  icon,
  as,
  className,
  children,
  href,
  type,
  activeClassName,
  isActive,
  ...props
}) {
  const Tag = as ? as : "button";

  const handleClick = (label, location, section) => {
    // !Todo: Fix Segment Tracking
    const isBrowser = typeof window !== "undefined" && window;

    // if (isBrowser) {
    //   window.analytics.track("Button Click Event", {
    //     label: label,
    //     location: location,
    //     section: section,
    //   });
    // }
  };

  const ButtonIcon = () => (
    <Icon
      className={`
        ${Styles[icon.position]}
        ${icon.color === "primary" ? "text-primary-600" : ""}
      `}
      name={icon.name}
    />
  );

  return (
    <Link
      onClick={() => handleClick(`${children}`)}
      className={Styles.link}
      activeClassName={isActive ? activeClassName : undefined}
      data-test={isActive}
      href={href}>
      <Tag
        className={`${Styles[type]} ${Styles.icon || ""} ${className || ""}`}
        {...props}>
        {icon && icon.position === "left" && <ButtonIcon />}
        {children}
        {icon && icon.position === "right" && <ButtonIcon />}
      </Tag>
    </Link>
  );
}

Button.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "text",
    "white",
    "light",
  ]),
};
