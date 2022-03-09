// import { Footer, Header, Helpers } from 'components'
import React, { useRef, useState, useContext } from "react";
import { Header, Footer } from "components";
import * as Styles from "styles/Layout.module.css";
import LayoutContext from "context/LayoutContext";

const Layout = ({ children, data, ...props }) => {
  const websiteWrapper = useRef(null);
  const { pageSettings } = useContext(LayoutContext);
  const [settings, setSettings] = useState({ ...pageSettings });

  /**
   * Gets page context from WordPress to check if the
   * page should hide any of the listed elements
   **/
  const { footer, header, navigation, buttons } = settings || {};

  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <LayoutContext.Provider value={{ settings, setSettings }}>
      <div ref={websiteWrapper}>
        <div className={`${Styles.wrapper}`}>
          {(header || !settings) && (
            <Header
              primaryMenu={data.navigation}
              websiteWrapper={websiteWrapper}
              showNavigation={navigation || !settings}
              showButtons={buttons || !settings}
            />
          )}

          <main className={Styles.main}>{children}</main>

          {(footer || !settings) && <Footer data={data.footer} />}

          {/* <Footer minimal={!footer || !pageContext?.pageSettings} /> */}
        </div>
      </div>

      {isDevelopment && (
        <>
          {/* <pre className='bg-yellow-50 border border-yellow-300 container p-8 text-yellow-600 mb-16'>
            {JSON.stringify(settings, null, 2)}
          </pre> */}

          <div className='text-white bg-black text-center uppercase fixed bottom-0 left-0 right-0 z-50'>
            <div className='hidden 2xl:block'>2xl</div>
            <div className='hidden xl:block  2xl:hidden'>xl</div>
            <div className='hidden lg:block  xl:hidden'>lg</div>
            <div className='hidden md:block  lg:hidden'>md</div>
            <div className='hidden sm:block  md:hidden'>sm</div>
            <div className='block  sm:hidden'>xs</div>
          </div>
        </>
      )}
    </LayoutContext.Provider>
  );
};

export default Layout;
