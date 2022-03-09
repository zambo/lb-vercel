import React from "react";
import * as Styles from "styles/Hamburger.module.css";

const Hamburger = ({ navState, handleToggle, ...props }) => {
  return (
    <button className={Styles.hamburgerWrapper} onClick={() => handleToggle()}>
      <svg
        width={8 * 3}
        viewBox='0 0 26 26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        className={`${Styles.hamburger} ${navState && Styles.active}`}
        {...props}>
        <path
          d='M21 13H5C3.83333 13 1.5 12.3 1.5 9.5C1.5 6.7 3.83333 6 5 6H21'
          pathLength='100'
        />
        <path
          d='M5 13H21C22.1667 13 24.5 13.7 24.5 16.5C24.5 19.3 22.1667 20 21 20H5'
          pathLength='100'
        />
        <path d='M5 13H11H21' pathLength='100' />
      </svg>
    </button>
  );
};

export default Hamburger;
