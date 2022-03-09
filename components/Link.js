import React from "react";
import NextLink from "next/link";

// Simply a Placeholder for now, in case we need to hook into the link component, we don't need to change it everywhere.
export default function Link({
  children,
  className = "",
  activeClassName = "",
  href,
  ...props
}) {
  const internal = /^\/(?!\/)/.test(href);

  return (
    <NextLink href={href} {...props}>
      <a
        className={`${className} ${activeClassName}`}
        target={!internal ? "_blank" : undefined}>
        {children}
      </a>
    </NextLink>
  );
}
