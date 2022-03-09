import { useState, useEffect } from "react";

const windowGlobal = typeof window !== "undefined" && window;

function getWindowDimensions() {
  if (windowGlobal) {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    return {
      windowWidth,
      windowHeight,
    };
  }

  return;
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    if (windowGlobal) {
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }

    return;
  }, []);

  return windowDimensions;
}
