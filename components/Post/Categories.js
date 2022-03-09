import React from "react";
import { Link } from "components";
import * as Styles from "styles/Categories.module.css";

export default function Categories({ data = [], className }) {
  return data ? (
    <ul className={`list-none m-0 flex gap-2 ${className}`}>
      {data.map(({ node }) => {
        return (
          <li
            className={Styles.category}
            key={node.slug}
            data-label={node.slug}>
            <Link href={`/category/${node.slug}`}>{node.name}</Link>
          </li>
        );
      })}
    </ul>
  ) : (
    <></>
  );
}
