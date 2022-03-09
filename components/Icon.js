import React from "react";
import * as RemixIcons from "react-icons/ri";

const Icon = ({ name, ...props }) => {
  const IconTag = typeof name === "string" ? RemixIcons[name] : <></>;

  return <IconTag {...props} />;
};

export default Icon;
