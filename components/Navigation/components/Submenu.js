import React from "react";
import { Button } from "components";

const Submenu = ({
  data = [],
  currentId,
  Submenu,
  isHover,
  className,
  inline,
  icon,
  parentPath,
}) => {
  return (
    <ul className={className}>
      {data.edges.map(({ node }) => {
        const anchor = /^\#(?!\/)/.test(node.path);

        return (
          <li key={node.id}>
            <Button
              as='span'
              type='text'
              href={anchor && parentPath ? parentPath + node.path : node.path}
              icon={icon}>
              {node.label}
            </Button>

            {node?.childItems?.edges?.length > 0 && Submenu && (
              <Submenu
                data={node.childItems}
                parentPath={node.path.slice(0, -1)}
                icon={{
                  position: "right",
                  name: "RiArrowRightLine",
                }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Submenu;
