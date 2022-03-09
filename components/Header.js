import React from "react";
import { Logo, Link, Button, Navigation } from "components";
import * as Styles from "styles/Header.module.css";

export default function Header({
  websiteWrapper,
  showNavigation,
  showButtons,
  primaryMenu,
}) {
  return (
    <header className={Styles.header}>
      <div className={Styles.wrapper}>
        <Link href='/'>
          <Logo className={Styles.logo} width={8 * 20} color='primary' />
        </Link>

        <Navigation
          primaryMenu={primaryMenu}
          showNavigation={showNavigation}
          websiteWrapper={websiteWrapper}
        />

        {showButtons && (
          <div className={Styles.buttons}>
            <Button
              type='text'
              icon={{ icon: { name: "RiLoginCircleLine" } }}
              href='https://app.leadboxer.com/'>
              Sign in
            </Button>
            <Button type='light' href='/start'>
              Start Trial
            </Button>
            <Button type='primary' href='/demo'>
              Request Demo
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
