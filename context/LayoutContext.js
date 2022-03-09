import React from "react";

const LayoutContext = React.createContext({
  pageSettings: { footer: true, header: true, navigation: true, buttons: true },
  setPageSettings: () => {},
});

export default LayoutContext;
