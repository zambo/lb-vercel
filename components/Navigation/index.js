import React, { useEffect, useState } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import PropTypes from "prop-types";
import { Hamburger, MenuItems } from "./components";
import { motion, AnimatePresence } from "framer-motion";
import * as Styles from "styles/Navigation.module.css";

export default function Navigation({
  showNavigation,
  websiteWrapper,
  primaryMenu,
}) {
  const [navState, setNavState] = useState(false);
  const { windowWidth } = useWindowDimensions() || {};

  const handleToggle = () => {
    setNavState(!navState);
  };

  const handleClose = () => {
    setNavState(false);
  };

  const smallWindow = windowWidth < 1280;

  useEffect(() => {
    // const smallWindow = windowWidth < 1280;

    if (websiteWrapper) {
      if (navState && smallWindow) {
        websiteWrapper.current.style.height = "100vh";
        websiteWrapper.current.style.overflowY = "hidden";
      } else {
        websiteWrapper.current.style.height = "auto";
        websiteWrapper.current.style.overflowY = "initial";
      }
    }

    window.addEventListener("resize", () => {
      setNavState(false);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setNavState(false);
      });
    };
  }, [windowWidth, navState, websiteWrapper, smallWindow]);

  return showNavigation ? (
    <>
      <Hamburger navState={navState} handleToggle={handleToggle} />

      <AnimatePresence>
        {(navState || !smallWindow) && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${Styles.navigation}`}>
            <MenuItems
              data={primaryMenu?.edges}
              handleClose={handleClose}
              navState={navState}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  ) : (
    <></>
  );
}

Navigation.propTypes = {
  showNavigation: PropTypes.bool,
  navState: PropTypes.bool,
  parent: PropTypes.object,
  handleToggleNavigation: PropTypes.func,
};
