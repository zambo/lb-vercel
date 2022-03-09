import React, { useState } from "react";
import Submenu from "./Submenu";
import { Button } from "components";
import { useRouter } from "next/router";
import * as Styles from "styles/MenuItems.module.css";

export default function MenuItem({ data = [], handleClose, navState }) {
  const router = useRouter();

  return data ? (
    <ul className={Styles.wrapper}>
      {data
        .filter(({ node }) => {
          return node?.parentId === null;
        })
        .map(({ node }) => {
          return (
            <li
              className={Styles.menuITem}
              onMouseEnter={(e) => {
                e.currentTarget.dataset.hover = true;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.dataset.hover = false;
              }}
              onClick={(e) => {
                e.currentTarget.dataset.hover = false;
              }}
              key={node.label}>
              <Button
                onClick={() => handleClose()}
                as='span'
                type='text'
                href={node.path.slice(0, -1)}
                isActive={router.asPath === node.path.slice(0, -1)}
                activeClassName={Styles.active}>
                {node.label}
              </Button>

              {node.childItems.edges.length > 0 && (
                <Submenu
                  className={Styles.submenu}
                  data={node.childItems}
                  parentPath={node.path.slice(0, -1)}
                  Submenu={Submenu}
                />
              )}
            </li>
          );
        })}
    </ul>
  ) : (
    <></>
  );
}
